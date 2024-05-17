export interface LogbookDetailDTO {
    id: string,
    logbookId: string,
    meetingDate: Date,
    missingStudents: string[]
    meetingComments: string,
    meetingCommit: string,
    professorId: string,
}   