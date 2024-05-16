-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id_role" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "roles" (
    "id_role" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,
    "role_description" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_role")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_name_key" ON "roles"("role_name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;
