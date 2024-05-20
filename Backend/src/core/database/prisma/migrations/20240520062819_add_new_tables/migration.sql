/*
  Warnings:

  - You are about to drop the column `schedule_day` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `schedule_month` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `schedule_year` on the `schedule` table. All the data in the column will be lost.
  - Added the required column `course_level` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule_date` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "course_level" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "schedule_day",
DROP COLUMN "schedule_month",
DROP COLUMN "schedule_year",
ADD COLUMN     "schedule_date" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "permissions" (
    "id_permission" TEXT NOT NULL,
    "id_form_permission" TEXT NOT NULL,
    "create_permission" BOOLEAN NOT NULL,
    "update_permission" BOOLEAN NOT NULL,
    "read_permission" BOOLEAN NOT NULL,
    "delete_permission" BOOLEAN NOT NULL,
    "id_role_permission" TEXT NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id_permission")
);

-- CreateTable
CREATE TABLE "forms" (
    "id_form" TEXT NOT NULL,
    "form_name" TEXT NOT NULL,
    "form_description" TEXT NOT NULL,
    "form_route" TEXT NOT NULL,

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id_form")
);

-- CreateTable
CREATE TABLE "course_student" (
    "id_course_student" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_course" TEXT NOT NULL,
    "active_student" BOOLEAN NOT NULL,

    CONSTRAINT "course_student_pkey" PRIMARY KEY ("id_course_student")
);

-- CreateTable
CREATE TABLE "meeting" (
    "id_meeting" TEXT NOT NULL,
    "meeting_date" TIMESTAMP(3) NOT NULL,
    "meeting_place" TEXT NOT NULL,
    "meeting_folder_number" TEXT NOT NULL,
    "meeting_professor_id" TEXT NOT NULL,

    CONSTRAINT "meeting_pkey" PRIMARY KEY ("id_meeting")
);

-- CreateTable
CREATE TABLE "sector" (
    "id_sector" TEXT NOT NULL,
    "sector_name" TEXT NOT NULL,
    "sector_objective" TEXT NOT NULL,

    CONSTRAINT "sector_pkey" PRIMARY KEY ("id_sector")
);

-- CreateTable
CREATE TABLE "sector_course" (
    "id_sector_course" TEXT NOT NULL,
    "id_sector" TEXT NOT NULL,
    "id_course" TEXT NOT NULL,
    "sector_objective_course" TEXT NOT NULL,

    CONSTRAINT "sector_course_pkey" PRIMARY KEY ("id_sector_course")
);

-- CreateTable
CREATE TABLE "sector_score" (
    "id_sector_score" TEXT NOT NULL,
    "id_sector" TEXT NOT NULL,
    "score_sector" INTEGER NOT NULL,
    "folder_number_score" TEXT NOT NULL,
    "id_student_score" TEXT NOT NULL,

    CONSTRAINT "sector_score_pkey" PRIMARY KEY ("id_sector_score")
);

-- CreateIndex
CREATE UNIQUE INDEX "forms_form_name_key" ON "forms"("form_name");

-- CreateIndex
CREATE UNIQUE INDEX "sector_sector_name_key" ON "sector"("sector_name");

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_id_form_permission_fkey" FOREIGN KEY ("id_form_permission") REFERENCES "forms"("id_form") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_id_role_permission_fkey" FOREIGN KEY ("id_role_permission") REFERENCES "roles"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_student" ADD CONSTRAINT "course_student_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "courses"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_student" ADD CONSTRAINT "course_student_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector_course" ADD CONSTRAINT "sector_course_id_sector_fkey" FOREIGN KEY ("id_sector") REFERENCES "sector"("id_sector") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector_course" ADD CONSTRAINT "sector_course_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "courses"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector_score" ADD CONSTRAINT "sector_score_id_sector_fkey" FOREIGN KEY ("id_sector") REFERENCES "sector"("id_sector") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector_score" ADD CONSTRAINT "sector_score_folder_number_score_fkey" FOREIGN KEY ("folder_number_score") REFERENCES "team_ppi"("folder_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector_score" ADD CONSTRAINT "sector_score_id_student_score_fkey" FOREIGN KEY ("id_student_score") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
