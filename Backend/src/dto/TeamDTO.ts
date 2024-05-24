import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TeamDTO {
    id: string;

    @ApiProperty({ type: String, description: 'Número de carpeta' })
    @IsNotEmpty({ message: 'El número de carpeta no puede estar vacío' })
    @IsString({ message: 'El número de carpeta debe ser un string' })
    folderNumber: string;

    @ApiProperty({ type: String, description: 'Nombre del equipo' })
    @IsNotEmpty({ message: 'El nombre del equipo no puede estar vacío' })
    @IsString({ message: 'El nombre del equipo debe ser un string' })
    teamName: string;

    @ApiProperty({ type: String, description: 'Id del curso' })
    @IsNotEmpty({ message: 'El id del curso no puede estar vacío' })
    @IsString({ message: 'El id del curso debe ser un string' })
    idCourse: string;

    @ApiProperty({ type: String, description: 'Id del profesor' })
    @IsNotEmpty({ message: 'El id del profesor no puede estar vacío' })
    @IsString({ message: 'El id del profesor debe ser un string' })
    idUser: string;
}

export class TeamMembersDTO {
    id: string

    @ApiProperty({ type: String, description: 'Id del equipo' })
    @IsNotEmpty({ message: 'El id del número de carpeta del equipo no puede estar vacío' })
    @IsString({ message: 'El id del número de carpeta del equipo debe ser un string' })
    folderNumberId: string;

    @ApiProperty({ type: String, description: 'Id del curso' })
    @IsNotEmpty({ message: 'El id del curso no puede estar vacío' })
    @IsString({ message: 'El id del curso debe ser un string' })
    idCourse: string;

    @ApiProperty({ type: String, description: 'Id del estudiante' })
    @IsNotEmpty({ message: 'El id del usuario no puede estar vacío' })
    @IsString({ message: 'El id del usuario debe ser un string' })
    idUser: string;
}