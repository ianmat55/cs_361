import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import pgvector from "pgvector";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const userEmail = session.user.email;
  const body = await req.json();

  try {
    // Ensure the user exists
    const user = await prisma.users.upsert({
      where: { email: userEmail },
      update: {
        ...(body.personalInfo?.fullName && {
          full_name: body.personalInfo.fullName,
        }),
        ...(body.personalInfo?.location && {
          location: body.personalInfo.location,
        }),
      },
      create: {
        email: userEmail,
        full_name: body.personalInfo?.fullName || "",
        location: body.personalInfo?.location || "",
      },
    });

    // Delete old related data to avoid duplicates
    await prisma.$transaction([
      prisma.user_skills.deleteMany({ where: { user_id: user.user_id } }),
      prisma.user_experiences.deleteMany({ where: { user_id: user.user_id } }),
      prisma.user_projects.deleteMany({ where: { user_id: user.user_id } }),
      prisma.user_education.deleteMany({ where: { user_id: user.user_id } }),
    ]);

    // Prevent fetch requests if sections are empty
    const jobExperiences = body.jobExperiences || [];
    const projects = body.projects || [];
    const educationEntries = body.educationEntries || [];
    const skills = body.skills || [];

    // Fetch embeddings from OpenAI API
    const embeddingRequests = [
      ...jobExperiences.map((job) =>
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/embedding`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: req.headers.get("cookie") || "",
          },
          credentials: "include",
          body: JSON.stringify({
            userId: user.user_id,
            text: `${job.jobTitle} at ${job.company}: ${job.description}`,
            type: "experience",
          }),
        }).then((res) => res.json()),
      ),
      ...projects.map((project) =>
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/embedding`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: req.headers.get("cookie") || "",
          },
          credentials: "include",
          body: JSON.stringify({
            userId: user.user_id,
            text: `${project.projectName}: ${project.description}`,
            type: "project",
          }),
        }).then((res) => res.json()),
      ),
      ...educationEntries.map((edu) =>
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/embedding`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: req.headers.get("cookie") || "",
          },
          credentials: "include",
          body: JSON.stringify({
            userId: user.user_id,
            text: `${edu.degree} at ${edu.institution} (${edu.graduationYear})`,
            type: "education",
          }),
        }).then((res) => res.json()),
      ),
      ...skills.map((skill) =>
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/embedding`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: req.headers.get("cookie") || "",
          },
          credentials: "include",
          body: JSON.stringify({
            userId: user.user_id,
            text: `${skill.skillName} (${skill.years_exp} years) - Example: ${skill.example}`,
            type: "skill",
          }),
        }).then((res) => res.json()),
      ),
    ];

    const embeddingResponses = await Promise.all(embeddingRequests);

    // Insert experiences using raw SQL
    for (let i = 0; i < jobExperiences.length; i++) {
      const job = jobExperiences[i];
      const embedding = pgvector.toSql(embeddingResponses[i]?.embedding || []);
      await prisma.$executeRaw`
        INSERT INTO user_experiences (user_id, role, company, start_date, end_date, responsibilities, embedding) 
        VALUES (${user.user_id}, ${job.jobTitle}, ${job.company}, ${
          job.startDate ? new Date(job.startDate) : null
        }, 
                ${job.endDate ? new Date(job.endDate) : null}, ${
                  job.description
                }, ${embedding}::vector);
      `;
    }

    // Insert projects using raw SQL
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const embedding = pgvector.toSql(
        embeddingResponses[jobExperiences.length + i]?.embedding || [],
      );
      await prisma.$executeRaw`
        INSERT INTO user_projects (user_id, project_name, description, tech_stack, embedding) 
        VALUES (${user.user_id}, ${project.projectName}, ${project.description}, ${project.link}, ${embedding}::vector);
      `;
    }

    // Insert education using raw SQL
    for (let i = 0; i < educationEntries.length; i++) {
      const edu = educationEntries[i];
      const embedding = pgvector.toSql(
        embeddingResponses[jobExperiences.length + projects.length + i]
          ?.embedding || [],
      );
      await prisma.$executeRaw`
        INSERT INTO user_education (user_id, degree, institution, start_date, embedding) 
        VALUES (${user.user_id}, ${edu.degree}, ${edu.institution}, ${
          edu.graduationYear ? new Date(`${edu.graduationYear}-01-01`) : null
        }, ${embedding}::vector);
      `;
    }

    // Insert skills using raw SQL
    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i];
      const embedding = pgvector.toSql(
        embeddingResponses[
          jobExperiences.length + projects.length + educationEntries.length + i
        ]?.embedding || [],
      );
      await prisma.$executeRaw`
        INSERT INTO user_skills (user_id, skill_name, years_exp, example, embedding) 
        VALUES (${user.user_id}, ${skill.skillName}, ${skill.years_exp}::int, ${skill.example}, ${embedding}::vector);
      `;
    }

    return new Response(
      JSON.stringify({ message: "Profile updated successfully!" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user.email;

  try {
    const user = await prisma.users.findUnique({
      where: { email: userEmail },
      include: {
        user_skills: true,
        user_experiences: true,
        user_projects: true,
        user_resumes: true,
        user_education: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({
      personalInfo: {
        fullName: user.full_name || "",
        email: user.email || "",
        location: user.location || "",
      },

      skills:
        user.user_skills?.map((s) => ({
          skillName: s.skill_name || "",
          years_exp: s.years_exp || "",
          example: s.example || "",
        })) || [],

      jobExperiences:
        user.user_experiences?.map((j) => ({
          jobTitle: j.role || "",
          company: j.company || "",
          startDate: j.start_date?.toISOString().split("T")[0] || "",
          endDate: j.end_date ? j.end_date.toISOString().split("T")[0] : "",
          description: j.responsibilities || "",
        })) || [],

      projects:
        user.user_projects?.map((p) => ({
          projectName: p.project_name,
          description: p.description,
          link: p.tech_stack,
        })) || [],

      educationEntries:
        user.user_education?.map((e) => ({
          degree: e.degree || "",
          institution: e.institution || "",
          graduationYear: e.start_date
            ? new Date(e.start_date).getFullYear().toString()
            : "",
        })) || [],
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user.email;

  try {
    const user = await prisma.users.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.user_skills.deleteMany({ where: { user_id: user.user_id } }),
      prisma.user_experiences.deleteMany({ where: { user_id: user.user_id } }),
      prisma.user_projects.deleteMany({ where: { user_id: user.user_id } }),
      prisma.user_education.deleteMany({ where: { user_id: user.user_id } }),
      prisma.users.delete({ where: { user_id: user.user_id } }),
    ]);

    return NextResponse.json(
      { message: "Profile deleted successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
