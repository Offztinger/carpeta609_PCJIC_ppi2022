/*
  Warnings:

  - Changed the type of `schedule_date` on the `schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "schedule_date",
ADD COLUMN     "schedule_date" TIMESTAMP(3) NOT NULL;
