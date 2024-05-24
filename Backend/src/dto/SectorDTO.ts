import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class SectorDTO {
    idSector: string;
    @IsNotEmpty({ message: 'El nombre del sector no puede estar vacío' })
    @IsString({ message: 'El nombre del sector debe ser un string' })
    sectorName: string;
    @IsNotEmpty({ message: 'La objetivo del sector no puede estar vacía' })
    @IsString({ message: 'La objetivo del sector debe ser un string' })
    sectorObjective: string;
}

export class SectorCourseDTO {
    idSectorCourse: string;
    @IsNotEmpty({ message: 'El id del sector no puede estar vacío' })
    @IsString({ message: 'El id del sector debe ser un string' })
    idSector: string;
    @IsNotEmpty({ message: 'El id del curso no puede estar vacío' })
    @IsString({ message: 'El id del curso debe ser un string' })
    idCourse: string;
    @IsNotEmpty({ message: 'El objetivo del sector curso no puede estar vacío' })
    @IsString({ message: 'El objetivo del sector curso debe ser un string' })
    sectorObjectiveCourse: string;
}

export class SectorScoreDTO {
    idSectorScore: string;

    @IsNotEmpty({ message: 'El id del sector curso no puede estar vacío' })
    @IsString({ message: 'El id del sector curso debe ser un string' })
    idSectorCourse: string;
    @IsNotEmpty({ message: 'La nota del curso no puede estar vacía' })
    @IsNumber({}, { message: 'La nota del curso debe ser un entero' })
    scoreSector: number;
    @IsNotEmpty({ message: 'El id del numero de carpeta no puede estar vacío' })
    @IsString({ message: 'El id del numero de carpeta debe ser un string' })
    folderNumberId: string;
    @IsNotEmpty({ message: 'El id del estudiante no puede estar vacío' })
    @IsString({ message: 'El id del estudiante debe ser un string' })
    userId: string;
}