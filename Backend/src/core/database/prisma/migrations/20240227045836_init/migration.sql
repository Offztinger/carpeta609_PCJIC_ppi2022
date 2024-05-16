-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "documentNumber" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_documentNumber_key" ON "users"("documentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
