/*
  Warnings:

  - You are about to drop the `consultants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "consultants";

-- CreateTable
CREATE TABLE "schedule" (
    "id_schedule" TEXT NOT NULL,
    "folder_number" INTEGER NOT NULL,
    "id_professor" TEXT NOT NULL,
    "schedule_day" TEXT NOT NULL,
    "schedule_month" TEXT NOT NULL,
    "schedule_year" TEXT NOT NULL,
    "schedule_place" TEXT NOT NULL,
    "schedule_hour" TEXT NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id_schedule")
);

-- CreateIndex
CREATE UNIQUE INDEX "schedule_folder_number_key" ON "schedule"("folder_number");

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_folder_number_fkey" FOREIGN KEY ("folder_number") REFERENCES "team_ppi"("folder_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
