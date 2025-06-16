import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
import formidable from "formidable";
import { v4 as uuidv4 } from "uuid";

// Disable Next.js body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = formidable({
    multiples: false,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    filter: ({ mimetype }) => {
      return mimetype === "application/pdf";
    },
  });

  try {
    // Parse the form data
    const [fields, files] = await new Promise<
      [formidable.Fields, formidable.Files]
    >((resolve, reject) => {
      form.parse(request as any, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const file = Array.isArray(files.resume) ? files.resume[0] : files.resume;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Create unique filename and save to disk
    const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueFilename = `${uuidv4()}${path.extname(file.originalFilename || ".pdf")}`;
    const filePath = path.join(uploadDir, uniqueFilename);
    const fileUrl = `/uploads/resumes/${uniqueFilename}`;

    // Move the file to the upload directory
    await fs.promises.rename(file.filepath, filePath);

    // Save to database
    const resume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title: file.originalFilename || "Untitled Resume",
        fileUrl,
        pages: 1, // You might want to calculate actual page count
      },
    });

    return NextResponse.json(
      {
        message: "Resume uploaded successfully",
        resume: {
          id: resume.id,
          title: resume.title,
          fileUrl: resume.fileUrl,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading resume:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to upload resume",
      },
      { status: 500 }
    );
  }
}
