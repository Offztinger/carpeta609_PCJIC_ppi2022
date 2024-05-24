import { IsString, IsNotEmpty } from 'class-validator';

export class MeetingDTO {

    idMeeting: string
    @IsNotEmpty({ message: 'La fecha de la socialización no puede estar vacía' })
    @IsString({ message: 'La fecha de la socialización debe ser un string' })
    meetingDate: string

    @IsNotEmpty({ message: 'El lugar de la socialización no puede estar vacío' })
    @IsString({ message: 'El lugar de la socialización debe ser un string' })
    meetingPlace: string

    @IsNotEmpty({ message: 'El número de la carpeta no puede estar vacío' })
    @IsString({ message: 'El número de la carpeta debe ser un string' })
    folderNumberId: string

    @IsNotEmpty({ message: 'El id del profesor no puede estar vacío' })
    @IsString({ message: 'El id del profesor debe ser un string' })
    userId: string

}