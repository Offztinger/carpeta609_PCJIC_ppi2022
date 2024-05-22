-- AlterTable
ALTER TABLE "logbookDetail" ALTER COLUMN "meeting_date" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "logbook" ADD CONSTRAINT "logbook_folder_number_fkey" FOREIGN KEY ("folder_number") REFERENCES "team_ppi"("folder_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logbookDetail" ADD CONSTRAINT "logbookDetail_logbook_id_fkey" FOREIGN KEY ("logbook_id") REFERENCES "logbook"("id_logbook") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logbookDetail" ADD CONSTRAINT "logbookDetail_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
