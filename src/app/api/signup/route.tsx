import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { fullName, email, password } = await req.json();
  const existingUser = await prisma.profile.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.profile.create({
    data: {
      fullName: fullName,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ success: true });
}
