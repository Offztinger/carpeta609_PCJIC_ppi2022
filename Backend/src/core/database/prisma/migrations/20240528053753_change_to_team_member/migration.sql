/*
  Warnings:

  - You are about to drop the column `id_course` on the `team_members` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_id_course_fkey";

-- AlterTable
ALTER TABLE "team_members" DROP COLUMN "id_course";
