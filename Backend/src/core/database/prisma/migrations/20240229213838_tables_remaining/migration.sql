/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - The required column `id_user` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_user" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id_user");

-- CreateTable
CREATE TABLE "courses" (
    "id_course" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_description" TEXT NOT NULL,
    "id_professor" TEXT NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id_course")
);

-- CreateTable
CREATE TABLE "team_members" (
    "id_team_member" TEXT NOT NULL,
    "folder_number" INTEGER NOT NULL,
    "id_course" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "team_semester" TEXT NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id_team_member")
);

-- CreateTable
CREATE TABLE "team_ppi" (
    "id_team_ppi" TEXT NOT NULL,
    "folder_number" INTEGER NOT NULL,
    "team_name" TEXT NOT NULL,
    "id_course" TEXT NOT NULL,
    "team_semester" TEXT NOT NULL,

    CONSTRAINT "team_ppi_pkey" PRIMARY KEY ("id_team_ppi")
);

-- CreateTable
CREATE TABLE "consultants" (
    "id_consultant" TEXT NOT NULL,
    "folder_number" INTEGER NOT NULL,
    "id_professor" TEXT NOT NULL,
    "consultant_day" TEXT NOT NULL,
    "consultant_month" TEXT NOT NULL,
    "consultant_year" TEXT NOT NULL,
    "consultant_place" TEXT NOT NULL,
    "consultant_hour" TEXT NOT NULL,
    "semester" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "courses_course_name_key" ON "courses"("course_name");

-- CreateIndex
CREATE UNIQUE INDEX "team_members_folder_number_key" ON "team_members"("folder_number");

-- CreateIndex
CREATE UNIQUE INDEX "team_ppi_folder_number_key" ON "team_ppi"("folder_number");

-- CreateIndex
CREATE UNIQUE INDEX "consultants_folder_number_key" ON "consultants"("folder_number");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "courses"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_folder_number_fkey" FOREIGN KEY ("folder_number") REFERENCES "team_ppi"("folder_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_ppi" ADD CONSTRAINT "team_ppi_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "courses"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;
