/*
  Warnings:

  - You are about to drop the column `proficiency_level` on the `user_skills` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_skills" DROP COLUMN "proficiency_level",
ADD COLUMN     "example" TEXT,
ADD COLUMN     "years_exp" INTEGER DEFAULT 0;
