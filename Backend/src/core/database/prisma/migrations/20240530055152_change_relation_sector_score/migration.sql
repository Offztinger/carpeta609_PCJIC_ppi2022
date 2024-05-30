-- DropForeignKey
ALTER TABLE "sector_score" DROP CONSTRAINT "sector_score_id_sector_course_fkey";

-- AddForeignKey
ALTER TABLE "sector_score" ADD CONSTRAINT "sector_score_id_sector_course_fkey" FOREIGN KEY ("id_sector_course") REFERENCES "sector_course"("id_sector_course") ON DELETE RESTRICT ON UPDATE CASCADE;
