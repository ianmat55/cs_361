-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "public";

-- CreateTable
CREATE TABLE "user_education" (
    "edu_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "institution" TEXT,
    "degree" TEXT,
    "field_of_study" TEXT,
    "start_date" DATE,
    "end_date" DATE,
    "gpa" TEXT,
    "embedding" vector NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_education_pkey" PRIMARY KEY ("edu_id")
);

-- CreateTable
CREATE TABLE "user_experiences" (
    "exp_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT,
    "start_date" DATE,
    "end_date" DATE,
    "responsibilities" TEXT,
    "embedding" vector NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_experiences_pkey" PRIMARY KEY ("exp_id")
);

-- CreateTable
CREATE TABLE "user_projects" (
    "project_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "project_name" TEXT NOT NULL,
    "description" TEXT,
    "tech_stack" TEXT,
    "embedding" vector NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_projects_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "user_resumes" (
    "resume_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "job_description" TEXT,
    "file_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_resumes_pkey" PRIMARY KEY ("resume_id")
);

-- CreateTable
CREATE TABLE "user_skills" (
    "skill_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "skill_name" TEXT NOT NULL,
    "years_exp" INTEGER DEFAULT 0,
    "example" TEXT,
    "embedding" vector NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_skills_pkey" PRIMARY KEY ("skill_id")
);

-- CreateTable
CREATE TABLE "user_usage" (
    "usage_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "usage_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "resume_generations" INTEGER DEFAULT 0,
    "tokens_used" INTEGER DEFAULT 0,
    "notes" TEXT,

    CONSTRAINT "user_usage_pkey" PRIMARY KEY ("usage_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(255),
    "location" TEXT,
    "bio" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "user_education" ADD CONSTRAINT "user_education_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_experiences" ADD CONSTRAINT "user_experiences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_resumes" ADD CONSTRAINT "user_resumes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_usage" ADD CONSTRAINT "user_usage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
