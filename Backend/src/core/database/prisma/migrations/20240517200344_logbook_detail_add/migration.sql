-- CreateTable
CREATE TABLE "logbookDetail" (
    "id_logbook" TEXT NOT NULL,
    "logbook_id" TEXT NOT NULL,
    "meeting_date" TIMESTAMP(3) NOT NULL,
    "missing_students" TEXT[],
    "meeting_comments" TEXT NOT NULL,
    "meeting_commit" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,

    CONSTRAINT "logbookDetail_pkey" PRIMARY KEY ("id_logbook")
);
