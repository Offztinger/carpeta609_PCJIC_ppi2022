/*
  Warnings:

  - You are about to drop the `course_professor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "course_professor" DROP CONSTRAINT "course_professor_id_course_fkey";

-- DropForeignKey
ALTER TABLE "course_professor" DROP CONSTRAINT "course_professor_id_user_fkey";

-- DropTable
DROP TABLE "course_professor";
