-- CreateTable
CREATE TABLE "logbook" (
    "id_logbook" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "folder_number" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "id_professor" TEXT NOT NULL,
    "detailed_scope" TEXT NOT NULL,
    "first_meeting_scope" TEXT NOT NULL,
    "second_meeting_scope" TEXT NOT NULL,

    CONSTRAINT "logbook_pkey" PRIMARY KEY ("id_logbook")
);
