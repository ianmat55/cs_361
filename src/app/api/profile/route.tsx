import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user.email;
  const body = await req.json();

  try {
    // Ensure the user exists
    const user = await prisma.users.upsert({
      where: { email: userEmail },
      update: {
        full_name: body.personalInfo.fullName,
        location: body.personalInfo.location,
      },
      create: {
        email: userEmail,
        full_name: body.personalInfo.fullName,
        location: body.personalInfo.location,
      },
    });

    // Delete old related data to avoid duplicates
    await prisma.user_skills.deleteMany({
      where: { user_id: user.user_id },
    });
    await prisma.user_experiences.deleteMany({
      where: { user_id: user.user_id },
    });
    await prisma.user_projects.deleteMany({
      where: { user_id: user.user_id },
    });
    await prisma.user_education.deleteMany({
      where: { user_id: user.user_id },
    });

    // Insert Skills
    const skills = body.skills.map((skill) => ({
      user_id: user.user_id,
      skill_name: skill.skillName,
      proficiency_level: skill.years,
    }));
    await prisma.user_skills.createMany({ data: skills });

    // Insert Job Experiences
    const experiences = body.jobExperiences.map((job) => ({
      user_id: user.user_id,
      role: job.jobTitle,
      company: job.company,
      start_date: new Date(job.startDate),
      end_date: job.endDate ? new Date(job.endDate) : null,
      responsibilities: job.description,
    }));
    await prisma.user_experiences.createMany({ data: experiences });

    // Insert Projects
    const projects = body.projects.map((project) => ({
      user_id: user.user_id,
      project_name: project.projectName,
      description: project.description,
      tech_stack: project.link,
    }));
    await prisma.user_projects.createMany({ data: projects });

    // Insert Education
    const education = body.educationEntries.map((edu) => ({
      user_id: user.user_id,
      degree: edu.degree,
      institution: edu.institution,
      start_date: new Date(`${edu.graduationYear}-01-01`),
    }));
    await prisma.user_education.createMany({ data: education });

    return NextResponse.json(
      { message: "Profile updated successfully!" },
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
        user_education: true, // ✅ Now correctly fetching as an array
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({
      personalInfo: {
        fullName: user.full_name,
        email: user.email,
        location: user.location,
      },

      skills:
        user.user_skills?.map((s) => ({
          skillName: s.skill_name,
          years: s.proficiency_level,
          demonstration: "",
        })) || [], // ✅ Default to empty array

      jobExperiences:
        user.user_experiences?.map((j) => ({
          jobTitle: j.role,
          company: j.company,
          startDate: j.start_date?.toISOString().split("T")[0] || "",
          endDate: j.end_date ? j.end_date.toISOString().split("T")[0] : "",
          description: j.responsibilities,
        })) || [], // ✅ Default to empty array

      projects:
        user.user_projects?.map((p) => ({
          projectName: p.project_name,
          description: p.description,
          link: p.tech_stack,
        })) || [], // ✅ Default to empty array

      educationEntries:
        user.user_education?.map((e) => ({
          degree: e.degree,
          institution: e.institution,
          graduationYear: e.start_date
            ? new Date(e.start_date).getFullYear().toString()
            : "",
        })) || [], // ✅ Ensuring `user_education` is treated as an array
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

    await prisma.user_skills.deleteMany({
      where: { user_id: user.user_id },
    });
    await prisma.user_experiences.deleteMany({
      where: { user_id: user.user_id },
    });
    await prisma.user_projects.deleteMany({
      where: { user_id: user.user_id },
    });
    await prisma.user_education.deleteMany({
      where: { user_id: user.user_id },
    });
    await prisma.users.delete({ where: { user_id: user.user_id } });

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
