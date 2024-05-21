import { IsNotEmpty, IsString } from 'class-validator';

export class ScheduleDTO {
    id: string;

    @IsString({ message: 'El número de carpeta debe ser un string' })
    @IsNotEmpty({ message: 'El número de carpeta no puede estar vacío' })
    folderNumber: string;

    @IsString({ message: 'El nombre de la materia debe ser un string' })
    @IsNotEmpty({ message: 'El nombre de la materia no puede estar vacío' })
    idProfessor: string;

    @IsString({ message: 'El nombre de la materia debe ser un string' })
    @IsNotEmpty({ message: 'El nombre de la materia no puede estar vacío' })
    scheduleDate: string;

    @IsString({ message: 'El nombre de la materia debe ser un string' })
    @IsNotEmpty({ message: 'El nombre de la materia no puede estar vacío' })
    schedulePlace: string;

    @IsString({ message: 'El nombre de la materia debe ser un string' })
    @IsNotEmpty({ message: 'El nombre de la materia no puede estar vacío' })
    scheduleHour: string;
}   