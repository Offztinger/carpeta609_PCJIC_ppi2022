/*
  Warnings:

  - Changed the type of `course_level` on the `courses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "course_level",
ADD COLUMN     "course_level" INTEGER NOT NULL;
