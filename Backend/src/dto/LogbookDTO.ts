import { IsNotEmpty, IsString } from 'class-validator';

export class LogbookDTO {
    id: string;

    @IsNotEmpty({ message: 'El nombre del proyecto no puede estar vacío' })
    @IsString({ message: 'El nombre del proyecto debe ser un string' })
    projectName: string;

    @IsNotEmpty({ message: 'El número de carpeta no puede estar vacío' })
    @IsString({ message: 'El número de carpeta debe ser un string' })
    folderNumber: string;

    @IsNotEmpty({ message: 'La descripción del proyecto no puede estar vacía' })
    @IsString({ message: 'La descripción del proyecto debe ser un string' })
    description: string;

    @IsNotEmpty({ message: 'El alcance detallado no puede estar vacío' })
    @IsString({ message: 'El alcance detallado debe ser un string' })
    detailedScope: string;

    @IsNotEmpty({ message: 'El alcance de la primera socialización no puede estar vacío' })
    @IsString({ message: 'El alcance de la primera socialización debe ser un string' })
    firstMeetingScope: string;

    @IsNotEmpty({ message: 'El alcance de la segunda socialización no puede estar vacío' })
    @IsString({ message: 'El alcance de la segunda socialización debe ser un string' })
    secondMeetingScope: string;
}   