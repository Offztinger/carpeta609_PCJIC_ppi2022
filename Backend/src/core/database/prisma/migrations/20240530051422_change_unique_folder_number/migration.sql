-- DropIndex
DROP INDEX "schedule_folder_number_key";

-- AlterTable
ALTER TABLE "team_ppi" ADD COLUMN     "scheduleId" TEXT;
