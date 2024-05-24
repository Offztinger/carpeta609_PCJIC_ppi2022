/*
  Warnings:

  - You are about to drop the column `id_sector` on the `sector_score` table. All the data in the column will be lost.
  - Added the required column `id_sector_course` to the `sector_score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sector_score" DROP CONSTRAINT "sector_score_id_sector_fkey";

-- AlterTable
ALTER TABLE "sector_score" DROP COLUMN "id_sector",
ADD COLUMN     "id_sector_course" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sector_score" ADD CONSTRAINT "sector_score_id_sector_course_fkey" FOREIGN KEY ("id_sector_course") REFERENCES "sector"("id_sector") ON DELETE RESTRICT ON UPDATE CASCADE;
