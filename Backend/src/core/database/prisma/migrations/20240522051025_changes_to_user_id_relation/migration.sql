/*
  Warnings:

  - You are about to drop the column `professor_id` on the `logbookDetail` table. All the data in the column will be lost.
  - Added the required column `id_professor` to the `logbookDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_professor` to the `team_ppi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "logbookDetail" DROP CONSTRAINT "logbookDetail_professor_id_fkey";

-- AlterTable
ALTER TABLE "logbookDetail" DROP COLUMN "professor_id",
ADD COLUMN     "id_professor" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "team_ppi" ADD COLUMN     "id_professor" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "team_ppi" ADD CONSTRAINT "team_ppi_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logbookDetail" ADD CONSTRAINT "logbookDetail_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
