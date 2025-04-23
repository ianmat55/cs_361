import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { fullName, email, password } = await req.json();
  const existingUser = await prisma.users.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.users.create({
    data: {
      full_name: fullName,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json({ success: true });
}
