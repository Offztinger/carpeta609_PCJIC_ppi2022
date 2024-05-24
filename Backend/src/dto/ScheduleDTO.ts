import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ScheduleDTO {
    id: string;

    @ApiProperty({ type: String, description: 'Id del número de carpeta' })
    @IsNotEmpty({ message: 'El id del número de carpeta no puede estar vacío' })
    @IsString({ message: 'El id del número de carpeta debe ser un string' })
    folderNumberId: string;

    @ApiProperty({ type: String, description: 'Id del asesor' })
    @IsNotEmpty({ message: 'El id del asesor no puede estar vacío' })
    @IsString({ message: 'El id del asesor debe ser un string' })
    idUser: string;

    @ApiProperty({ type: String, description: 'Fecha de la asesoría' })
    @IsNotEmpty({ message: 'La fecha de la asesoría no puede estar vacío' })
    @IsString({ message: 'La fecha de la asesoría debe ser un string' })
    scheduleDate: string;

    @ApiProperty({ type: String, description: 'Lugar de la asesoría' })
    @IsNotEmpty({ message: 'El lugar de la asesoría no puede estar vacío' })
    @IsString({ message: 'El lugar de la asesoría debe ser un string' })
    schedulePlace: string;

    @ApiProperty({ type: String, description: 'Hora de la asesoría' })
    @IsNotEmpty({ message: 'La hora de la asesoría no puede estar vacío' })
    @IsString({ message: 'La hora de la asesoría debe ser un string' })
    scheduleHour: string;
}   