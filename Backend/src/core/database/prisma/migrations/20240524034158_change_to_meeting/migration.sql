-- AlterTable
ALTER TABLE "meeting" ALTER COLUMN "meeting_date" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "meeting" ADD CONSTRAINT "meeting_meeting_professor_id_fkey" FOREIGN KEY ("meeting_professor_id") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
