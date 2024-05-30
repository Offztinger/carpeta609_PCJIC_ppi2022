import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class MeetingDTO {

    id: string

    @ApiProperty({ type: String, description: 'Fecha de la socialización' })
    @IsNotEmpty({ message: 'La fecha de la socialización no puede estar vacía' })
    @IsString({ message: 'La fecha de la socialización debe ser un string' })
    meetingDate: string

    @ApiProperty({ type: String, description: 'Lugar de la socialización' })
    @IsNotEmpty({ message: 'El lugar de la socialización no puede estar vacío' })
    @IsString({ message: 'El lugar de la socialización debe ser un string' })
    meetingPlace: string

    @ApiProperty({ type: String, description: 'Numero de la carpeta' })
    @IsNotEmpty({ message: 'El número de la carpeta no puede estar vacío' })
    @IsString({ message: 'El número de la carpeta debe ser un string' })
    folderNumberId: string

    @ApiProperty({ type: String, description: 'Id del profesor' })
    @IsNotEmpty({ message: 'El id del profesor no puede estar vacío' })
    @IsString({ message: 'El id del profesor debe ser un string' })
    idUser: string

}