/*
  Warnings:

  - You are about to drop the column `folder_number_score` on the `sector_score` table. All the data in the column will be lost.
  - Added the required column `folder_number_id` to the `sector_score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "logbook" DROP CONSTRAINT "logbook_folder_number_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_folder_number_fkey";

-- DropForeignKey
ALTER TABLE "sector_score" DROP CONSTRAINT "sector_score_folder_number_score_fkey";

-- DropForeignKey
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_folder_number_fkey";

-- DropIndex
DROP INDEX "team_ppi_folder_number_key";

-- AlterTable
ALTER TABLE "sector_score" DROP COLUMN "folder_number_score",
ADD COLUMN     "folder_number_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_folder_number_fkey" FOREIGN KEY ("folder_number") REFERENCES "team_ppi"("id_team_ppi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_folder_number_fkey" FOREIGN KEY ("folder_number") REFERENCES "team_ppi"("id_team_ppi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logbook" ADD CONSTRAINT "logbook_folder_number_fkey" FOREIGN KEY ("folder_number") REFERENCES "team_ppi"("id_team_ppi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting" ADD CONSTRAINT "meeting_meeting_folder_number_fkey" FOREIGN KEY ("meeting_folder_number") REFERENCES "team_ppi"("id_team_ppi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector_score" ADD CONSTRAINT "sector_score_folder_number_id_fkey" FOREIGN KEY ("folder_number_id") REFERENCES "team_ppi"("id_team_ppi") ON DELETE RESTRICT ON UPDATE CASCADE;
