import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LogbookDetailDTO {
    id: string

    @ApiProperty({ type: String, description: 'Id de la bitacora' })
    @IsNotEmpty({ message: 'El id de la bitacora no puede estar vacío' })
    @IsString({ message: 'El id de la bitacora debe ser un string' })
    logbookId: string

    @ApiProperty({ type: String, description: 'Fecha de la asesoría' })
    @IsNotEmpty({ message: 'La fecha de la asesoría no puede estar vacío' })
    @IsString({ message: 'La fecha de la asesoría debe ser un string' })
    meetingDate: string

    @ApiProperty({ type: String, description: 'Estudiantes que faltaron a la asesoría' })
    @IsArray({ message: 'Los estudiantes deben ser un array' })
    @ArrayNotEmpty({ message: 'El array de estudiantes no puede estar vacío' })
    @IsString({ each: true, message: 'Cada estudiante debe ser una cadena' })
    @IsNotEmpty({ each: true, message: 'Cada estudiante no puede estar vacío' })
    missingStudents: string[]

    @ApiProperty({ type: String, description: 'Comentarios de la asesoría' })
    @IsNotEmpty({ message: 'Los comentarios de la asesoría no pueden estar vacío' })
    @IsString({ message: 'Los comentarios de la asesoría deben ser un string' })
    meetingComments: string

    @ApiProperty({ type: String, description: 'Compromisos de la asesoría' })
    @IsNotEmpty({ message: 'Los compromisos de la asesoría no puede estar vacío' })
    @IsString({ message: 'Los compromisos de la asesoría debe ser un string' })
    meetingCommit: string

    @ApiProperty({ type: String, description: 'Id del profesor' })
    @IsNotEmpty({ message: 'El id del profesor no puede estar vacío' })
    @IsString({ message: 'El id del profesor debe ser un string' })
    idUser: string
}   