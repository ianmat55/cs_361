// app/actions/uploadResume.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import pdfParse from 'pdf-parse';
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export default async function uploadResume(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const file = formData.get("resume") as unknown as File;

  if (!file || file.type !== "application/pdf") {
    throw new Error("Invalid PDF file");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const parsed = await pdfParse(buffer);

  // simulate local file upload
  const filename = `${uuidv4()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public/uploads/resumes", filename);
  console.log(filePath);
  // await fs.mkdir(path.dirname(filePath), { recursive: true });
  // await fs.writeFile(filePath, buffer);

  const fileUrl = `/uploads/resumes/${filename}`;

  const resume = await prisma.resume.create({
    data: {
      userId: session.user.id,
      title: file.name,
      fileUrl,
      // textContent: parsed.text,
      pages: parsed.numpages || 0,
    },
  });

  return { message: "Uploaded", resume };
}

