export interface TeamDTO {
    id: string;
    folderNumber: number;
    teamName: string;
    idCourse: string;
    teamSemester: string;
}

export interface TeamMembersDTO {
    id: string
    folderNumber: number;
    idCourse: string;
    idUser: string;
    memberSemester: string;
}