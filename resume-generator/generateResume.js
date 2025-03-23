import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import pgvector from "pgvector";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const prisma = new PrismaClient();

async function getUserData(userId, jobDescription) {
  try {
    // Generate job description embedding
    const embeddingResponse = await openai.embeddings.create({
      input: JSON.stringify(jobDescription, null, 2),
      model: "text-embedding-ada-002",
    });

    // Ensure valid embedding
    if (!embeddingResponse.data || !embeddingResponse.data.length) {
      throw new Error("OpenAI embedding generation failed.");
    }

    const jobEmbedding = embeddingResponse.data[0].embedding; // Vector array

    // Fetch top 5 relevant skills
    const skills = await prisma.$queryRaw`
      SELECT skill_name, years_exp, example
      FROM user_skills
      WHERE user_id = ${userId}
      ORDER BY embedding <-> ${pgvector.toSql(jobEmbedding)}::vector
      LIMIT 5;
    `;

    // Fetch top 3 relevant experiences
    const experiences = await prisma.$queryRaw`
      SELECT role, company, responsibilities
      FROM user_experiences
      WHERE user_id = ${userId}
      ORDER BY embedding <-> ${pgvector.toSql(jobEmbedding)}::vector
      LIMIT 3;
    `;

    // Fetch top 3 relevant projects
    const projects = await prisma.$queryRaw`
      SELECT project_name, description, tech_stack
      FROM user_projects
      WHERE user_id = ${userId}
      ORDER BY embedding <-> ${pgvector.toSql(jobEmbedding)}::vector
      LIMIT 3;
    `;

    return { skills, experiences, projects };
  } catch (error) {
    console.error("Error in getUserData:", error);
    throw new Error("Failed to retrieve user data.");
  }
}

async function generateResumeText(
  jobDescription,
  skills,
  experiences,
  projects
) {
  const skillsText = skills
    .map((s) => `${s.skill_name} (${s.years_exp} years) - ${s.example}`)
    .join("\n");
  const experienceText = experiences
    .map((e) => `${e.role} at ${e.company}: ${e.description}`)
    .join("\n");
  const projectText = projects
    .map(
      (p) => `${p.project_name}: ${p.description} [Tech Stack: ${p.tech_stack}]`
    )
    .join("\n");

  const prompt = `
    Generate a well-structured professional resume based on the provided job description, skills, experiences, and projects.

    **Job Description:**
    ${jobDescription}

    **User Skills:**
    ${skillsText}

    **Work Experience:**
    ${experienceText}

    **Projects:**
    ${projectText}

    Format the resume properly with sections for **Personal Info, Skills, Experience, and Projects**.
    Use professional formatting and avoid unnecessary explanations.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a professional resume writer." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "No response from AI.";
  } catch (error) {
    console.error("Error generating resume:", error);
    return "An error occurred while generating the resume.";
  }
}

app.post("/generate-resume", async (req, res) => {
  try {
    const { jobUrl, userId } = req.body;
    if (!jobUrl || !userId) {
      return res.status(400).json({ error: "Missing job URL or user ID" });
    }

    console.log("Scraping job description...");

    const response = await fetch(
      // "http://143.198.58.45:5050/job-posting-scrape/",
      "http://localhost:5050/job-posting-scrape/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ job_url: jobUrl }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }

    const jobDescription = await response.json();
    console.log(jobDescription);

    if (!jobDescription)
      return res.status(500).json({ error: "Failed to scrape job" });

    console.log("Retrieving relevant user data...");
    const { skills, experiences, projects } = await getUserData(
      userId,
      jobDescription
    );
    if (!skills.length && !experiences.length && !projects.length) {
      return res.status(404).json({ error: "No matching data found" });
    }

    console.log("Generating resume...");
    const resumeText = await generateResumeText(
      jobDescription,
      skills,
      experiences,
      projects
    );

    console.log(resumeText);

    res.setHeader("Content-Type", "text/plain");
    res.send(resumeText);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
