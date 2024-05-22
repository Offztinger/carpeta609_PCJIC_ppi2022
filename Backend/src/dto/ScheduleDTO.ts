import { IsNotEmpty, IsString } from 'class-validator';

export class ScheduleDTO {
    id: string;

    @IsNotEmpty({ message: 'El número de carpeta no puede estar vacío' })
    @IsString({ message: 'El número de carpeta debe ser un string' })
    folderNumber: string;

    @IsNotEmpty({ message: 'El id del asesor no puede estar vacío' })
    @IsString({ message: 'El id del asesor debe ser un string' })
    idProfessor: string;

    @IsNotEmpty({ message: 'La fecha de la asesoría no puede estar vacío' })
    @IsString({ message: 'La fecha de la asesoría debe ser un string' })
    scheduleDate: string;

    @IsNotEmpty({ message: 'El lugar de la asesoría no puede estar vacío' })
    @IsString({ message: 'El lugar de la asesoría debe ser un string' })
    schedulePlace: string;

    @IsNotEmpty({ message: 'La hora de la asesoría no puede estar vacío' })
    @IsString({ message: 'La hora de la asesoría debe ser un string' })
    scheduleHour: string;
}   