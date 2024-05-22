/*
  Warnings:

  - You are about to drop the column `active_student` on the `course_student` table. All the data in the column will be lost.
  - Added the required column `active_user` to the `course_student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course_student" DROP COLUMN "active_student",
ADD COLUMN     "active_user" BOOLEAN NOT NULL;
