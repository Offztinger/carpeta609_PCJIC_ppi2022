/*
  Warnings:

  - A unique constraint covering the columns `[folder_number]` on the table `logbook` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "logbook_folder_number_key" ON "logbook"("folder_number");
