-- CreateTable
CREATE TABLE "users" (
    "id_user" TEXT NOT NULL,
    "document_number" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "id_role" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "roles" (
    "id_role" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,
    "role_description" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id_permission" TEXT NOT NULL,
    "id_form_permission" TEXT NOT NULL,
    "create_permission" BOOLEAN NOT NULL,
    "update_permission" BOOLEAN NOT NULL,
    "read_permission" BOOLEAN NOT NULL,
    "delete_permission" BOOLEAN NOT NULL,
    "id_role_permission" TEXT NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id_permission")
);

-- CreateTable
CREATE TABLE "forms" (
    "id_form" TEXT NOT NULL,
    "form_name" TEXT NOT NULL,
    "form_description" TEXT NOT NULL,
    "form_route" TEXT NOT NULL,

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id_form")
);

-- CreateTable
CREATE TABLE "courses" (
    "id_course" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_description" TEXT NOT NULL,
    "course_level" INTEGER NOT NULL,
    "is_alternative" BOOLEAN NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id_course")
);

-- CreateTable
CREATE TABLE "course_student" (
    "id_course_student" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_course" TEXT NOT NULL,
    "active_user" BOOLEAN NOT NULL,

    CONSTRAINT "course_student_pkey" PRIMARY KEY ("id_course_student")
);

-- CreateTable
CREATE TABLE "team_ppi" (
    "id_team_ppi" TEXT NOT NULL,
    "folder_number" TEXT NOT NULL,
    "team_name" TEXT NOT NULL,
    "id_course" TEXT NOT NULL,
    "id_professor" TEXT NOT NULL,

    CONSTRAINT "team_ppi_pkey" PRIMARY KEY ("id_team_ppi")
);

-- CreateTable
CREATE TABLE "team_members" (
    "id_team_member" TEXT NOT NULL,
    "folder_number" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id_team_member")
);

-- CreateTable
CREATE TABLE "schedule" (
    "id_schedule" TEXT NOT NULL,
    "folder_number" TEXT NOT NULL,
    "id_professor" TEXT NOT NULL,
    "schedule_date" TEXT NOT NULL,
    "schedule_place" TEXT NOT NULL,
    "schedule_hour" TEXT NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id_schedule")
);

-- CreateTable
CREATE TABLE "logbook" (
    "id_logbook" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "folder_number" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detailed_scope" TEXT NOT NULL,
    "first_meeting_scope" TEXT NOT NULL,
    "second_meeting_scope" TEXT NOT NULL,

    CONSTRAINT "logbook_pkey" PRIMARY KEY ("id_logbook")
);

-- CreateTable
CREATE TABLE "logbookDetail" (
    "id_logbook" TEXT NOT NULL,
    "logbook_id" TEXT NOT NULL,
    "meeting_date" TEXT NOT NULL,
    "missing_students" TEXT[],
    "meeting_comments" TEXT NOT NULL,
    "meeting_commit" TEXT NOT NULL,
    "id_professor" TEXT NOT NULL,

    CONSTRAINT "logbookDetail_pkey" PRIMARY KEY ("id_logbook")
);

-- CreateTable
CREATE TABLE "meeting" (
    "id_meeting" TEXT NOT NULL,
    "meeting_date" TEXT NOT NULL,
    "meeting_place" TEXT NOT NULL,
    "meeting_folder_number" TEXT NOT NULL,
    "meeting_professor_id" TEXT NOT NULL,

    CONSTRAINT "meeting_pkey" PRIMARY KEY ("id_meeting")
);

-- CreateTable
CREATE TABLE "sector" (
    "id_sector" TEXT NOT NULL,
    "sector_name" TEXT NOT NULL,
    "sector_objective" TEXT NOT NULL,

    CONSTRAINT "sector_pkey" PRIMARY KEY ("id_sector")
);

-- CreateTable
CREATE TABLE "sector_course" (
    "id_sector_course" TEXT NOT NULL,
    "id_sector" TEXT NOT NULL,
    "id_course" TEXT NOT NULL,
    "sector_objective_course" TEXT NOT NULL,

    CONSTRAINT "sector_course_pkey" PRIMARY KEY ("id_sector_course")
);

-- CreateTable
CREATE TABLE "sector_score" (
    "id_sector_score" TEXT NOT NULL,
    "id_sector_course" TEXT NOT NULL,
    "score_sector" INTEGER NOT NULL,
    "folder_number_id" TEXT NOT NULL,
    "id_student_score" TEXT NOT NULL,

    CONSTRAINT "sector_score_pkey" PRIMARY KEY ("id_sector_score")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_document_number_key" ON "users"("document_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_name_key" ON "roles"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "forms_form_name_key" ON "forms"("form_name");

-- CreateIndex
CREATE UNIQUE INDEX "courses_course_name_key" ON "courses"("course_name");

-- CreateIndex
CREATE UNIQUE INDEX "logbook_folder_number_key" ON "logbook"("folder_number");

-- CreateIndex
CREATE UNIQUE INDEX "sector_sector_name_key" ON "sector"("sector_name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_id_form_permission_fkey" FOREIGN KEY ("id_form_permission") REFERENCES "forms"("id_form") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_id_role_permission_fkey" FOREIGN KEY ("id_role_permission") REFERENCES "roles"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_student" ADD CONSTRAINT "course_student_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "courses"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_student" ADD CONSTRAINT "course_student_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_ppi" ADD CONSTRAINT "team_ppi_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_ppi" ADD CONSTRAINT "team_ppi_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "courses"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_folder_number_fkey" FOREIGN KEY ("folder_number") REFERENCES "team_ppi"("id_team_ppi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_folder_number_fkey" FOREIGN KEY ("folder_number") REFERENCES "team_ppi"("id_team_ppi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logbook" ADD CONSTRAINT "logbook_folder_number_fkey" FOREIGN KEY ("folder_number") REFERENCES "team_ppi"("id_team_ppi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logbookDetail" ADD CONSTRAINT "logbookDetail_logbook_id_fkey" FOREIGN KEY ("logbook_id") REFERENCES "logbook"("id_logbook") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logbookDetail" ADD CONSTRAINT "logbookDetail_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting" ADD CONSTRAINT "meeting_meeting_folder_number_fkey" FOREIGN KEY ("meeting_folder_number") REFERENCES "team_ppi"("id_team_ppi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting" ADD CONSTRAINT "meeting_meeting_professor_id_fkey" FOREIGN KEY ("meeting_professor_id") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector_course" ADD CONSTRAINT "sector_course_id_sector_fkey" FOREIGN KEY ("id_sector") REFERENCES "sector"("id_sector") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector_course" ADD CONSTRAINT "sector_course_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "courses"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector_score" ADD CONSTRAINT "sector_score_id_sector_course_fkey" FOREIGN KEY ("id_sector_course") REFERENCES "sector_course"("id_sector_course") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector_score" ADD CONSTRAINT "sector_score_folder_number_id_fkey" FOREIGN KEY ("folder_number_id") REFERENCES "team_ppi"("id_team_ppi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector_score" ADD CONSTRAINT "sector_score_id_student_score_fkey" FOREIGN KEY ("id_student_score") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
