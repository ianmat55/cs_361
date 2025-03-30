// TODO: Implement as separate microservice later?

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { generateEmbedding } from "@/lib/openai";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { text } = body;

  try {
    // Generate embedding using OpenAI
    const embedding = await generateEmbedding(text);

    return NextResponse.json({ embedding }, { status: 200 });
  } catch (error) {
    console.error("Embedding Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
