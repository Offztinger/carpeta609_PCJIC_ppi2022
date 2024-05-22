import { IsNotEmpty, IsString } from 'class-validator';

export class TeamDTO {
    id: string;

    @IsNotEmpty({ message: 'El número de carpeta no puede estar vacío' })
    @IsString({ message: 'El número de carpeta debe ser un string' })
    folderNumber: string;

    @IsNotEmpty({ message: 'El nombre del equipo no puede estar vacío' })
    @IsString({ message: 'El nombre del equipo debe ser un string' })
    teamName: string;

    @IsNotEmpty({ message: 'El id del curso no puede estar vacío' })
    @IsString({ message: 'El id del curso debe ser un string' })
    idCourse: string;


    @IsNotEmpty({ message: 'El id del profesor no puede estar vacío' })
    @IsString({ message: 'El id del profesor debe ser un string' })
    idUser: string;
}

export class TeamMembersDTO {
    id: string

    @IsNotEmpty({ message: 'El id del número de carpeta del equipo no puede estar vacío' })
    @IsString({ message: 'El id del número de carpeta del equipo debe ser un string' })
    folderNumberId: string;

    @IsNotEmpty({ message: 'El id del curso no puede estar vacío' })
    @IsString({ message: 'El id del curso debe ser un string' })
    idCourse: string;

    @IsNotEmpty({ message: 'El id del usuario no puede estar vacío' })
    @IsString({ message: 'El id del usuario debe ser un string' })
    idUser: string;
}