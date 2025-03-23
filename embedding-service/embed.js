import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5678;

// Middleware for JSON body parsing
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("OpenAI Embedding Error:", error);
    throw new Error("Failed to generate embedding");
  }
}

// POST /embed route
app.post("/embed", async (req, res) => {
  try {
    const { text, type } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ error: "Missing 'text' field in request body" });
    }

    // Generate embedding
    const embedding = await generateEmbedding(text);
    console.log("Embedding created...");
    // Return embedding
    return res.status(200).json({ embedding, type });
  } catch (error) {
    console.error("Embedding Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Embedding service listening on port ${PORT}`);
});
