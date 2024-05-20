-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_folder_number_fkey";

-- DropForeignKey
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_folder_number_fkey";

-- AlterTable
ALTER TABLE "logbook" ALTER COLUMN "folder_number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "schedule" ALTER COLUMN "folder_number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "team_members" ALTER COLUMN "folder_number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "team_ppi" ALTER COLUMN "folder_number" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_folder_number_fkey" FOREIGN KEY ("folder_number") REFERENCES "team_ppi"("folder_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_folder_number_fkey" FOREIGN KEY ("folder_number") REFERENCES "team_ppi"("folder_number") ON DELETE RESTRICT ON UPDATE CASCADE;
