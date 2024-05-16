/*
  Warnings:

  - You are about to drop the column `first_last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `second_last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `second_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `third_name` on the `users` table. All the data in the column will be lost.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "first_last_name",
DROP COLUMN "first_name",
DROP COLUMN "second_last_name",
DROP COLUMN "second_name",
DROP COLUMN "third_name",
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
