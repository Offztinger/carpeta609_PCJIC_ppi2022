/*
  Warnings:

  - You are about to drop the column `id_professor` on the `courses` table. All the data in the column will be lost.
  - Added the required column `is_alternative` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_id_professor_fkey";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "id_professor",
ADD COLUMN     "is_alternative" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "course_professor" (
    "id_course_professor" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_course" TEXT NOT NULL,
    "active_professor" BOOLEAN NOT NULL,

    CONSTRAINT "course_professor_pkey" PRIMARY KEY ("id_course_professor")
);

-- AddForeignKey
ALTER TABLE "course_professor" ADD CONSTRAINT "course_professor_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "courses"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_professor" ADD CONSTRAINT "course_professor_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
