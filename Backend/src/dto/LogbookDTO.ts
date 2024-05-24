import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LogbookDTO {
    id: string;

    @ApiProperty({ type: String, description: 'Nombre del proyecto' })
    @IsNotEmpty({ message: 'El nombre del proyecto no puede estar vacío' })
    @IsString({ message: 'El nombre del proyecto debe ser un string' })
    projectName: string;

    @ApiProperty({ type: String, description: 'Id del número de carpeta' })
    @IsNotEmpty({ message: 'El id del número de carpeta no puede estar vacío' })
    @IsString({ message: 'El id del número de carpeta debe ser un string' })
    folderNumberId: string;

    @ApiProperty({ type: String, description: 'Descripción del proyecto' })
    @IsNotEmpty({ message: 'La descripción del proyecto no puede estar vacía' })
    @IsString({ message: 'La descripción del proyecto debe ser un string' })
    description: string;

    @ApiProperty({ type: String, description: 'Alcance detallado' })
    @IsNotEmpty({ message: 'El alcance detallado no puede estar vacío' })
    @IsString({ message: 'El alcance detallado debe ser un string' })
    detailedScope: string;

    @ApiProperty({ type: String, description: 'Alcance de la primera socialización' })
    @IsNotEmpty({ message: 'El alcance de la primera socialización no puede estar vacío' })
    @IsString({ message: 'El alcance de la primera socialización debe ser un string' })
    firstMeetingScope: string;

    @ApiProperty({ type: String, description: 'Alcance de la segunda socialización' })
    @IsNotEmpty({ message: 'El alcance de la segunda socialización no puede estar vacío' })
    @IsString({ message: 'El alcance de la segunda socialización debe ser un string' })
    secondMeetingScope: string;
}   