/*
  Warnings:

  - Added the required column `first_last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_role` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `third_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "first_last_name" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "id_role" INTEGER NOT NULL,
ADD COLUMN     "second_last_name" TEXT NOT NULL,
ADD COLUMN     "second_name" TEXT NOT NULL,
ADD COLUMN     "third_name" TEXT NOT NULL;
