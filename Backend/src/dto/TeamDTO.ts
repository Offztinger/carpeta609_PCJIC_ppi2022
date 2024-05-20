export interface TeamDTO {
    id: string;
    folderNumber: string;
    teamName: string;
    idCourse: string;
    teamSemester: string;
}

export interface TeamMembersDTO {
    id: string
    folderNumber: string;
    idCourse: string;
    idUser: string;
    memberSemester: string;
}