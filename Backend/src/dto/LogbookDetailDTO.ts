import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class LogbookDetailDTO {
    id: string

    @IsNotEmpty({ message: 'El id de la bitacora no puede estar vacío' })
    @IsString({ message: 'El id de la bitacora debe ser un string' })
    logbookId: string

    @IsNotEmpty({ message: 'La fecha de la asesoría no puede estar vacío' })
    @IsString({ message: 'La fecha de la asesoría debe ser un string' })
    meetingDate: string

    @IsArray({ message: 'Los estudiantes deben ser un array' })
    @ArrayNotEmpty({ message: 'El array de estudiantes no puede estar vacío' })
    @IsString({ each: true, message: 'Cada estudiante debe ser una cadena' })
    @IsNotEmpty({ each: true, message: 'Cada estudiante no puede estar vacío' })
    missingStudents: string[]

    @IsNotEmpty({ message: 'Los comentarios de la asesoría no pueden estar vacío' })
    @IsString({ message: 'Los comentarios de la asesoría deben ser un string' })
    meetingComments: string

    @IsNotEmpty({ message: 'Los compromisos de la asesoría no puede estar vacío' })
    @IsString({ message: 'Los compromisos de la asesoría debe ser un string' })
    meetingCommit: string

    @IsNotEmpty({ message: 'El id del profesor no puede estar vacío' })
    @IsString({ message: 'El id del profesor debe ser un string' })
    professorId: string
}   