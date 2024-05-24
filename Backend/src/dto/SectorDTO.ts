import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SectorDTO {
    idSector: string;
    @ApiProperty({ type: String, description: 'Nombre del sector' })
    @IsNotEmpty({ message: 'El nombre del sector no puede estar vacío' })
    @IsString({ message: 'El nombre del sector debe ser un string' })
    sectorName: string;
    @ApiProperty({ type: String, description: 'Objetivo del sector' })
    @IsNotEmpty({ message: 'La objetivo del sector no puede estar vacía' })
    @IsString({ message: 'La objetivo del sector debe ser un string' })
    sectorObjective: string;
}

export class SectorCourseDTO {
    idSectorCourse: string;
    @ApiProperty({ type: String, description: 'Id del sector' })
    @IsNotEmpty({ message: 'El id del sector no puede estar vacío' })
    @IsString({ message: 'El id del sector debe ser un string' })
    idSector: string;
    @ApiProperty({ type: String, description: 'Id del curso' })
    @IsNotEmpty({ message: 'El id del curso no puede estar vacío' })
    @IsString({ message: 'El id del curso debe ser un string' })
    idCourse: string;
    @ApiProperty({ type: String, description: 'Objetivo del sector curso' })
    @IsNotEmpty({ message: 'El objetivo del sector curso no puede estar vacío' })
    @IsString({ message: 'El objetivo del sector curso debe ser un string' })
    sectorObjectiveCourse: string;
}

export class SectorScoreDTO {
    idSectorScore: string;

    @ApiProperty({ type: String, description: 'Id del sector curso' })
    @IsNotEmpty({ message: 'El id del sector curso no puede estar vacío' })
    @IsString({ message: 'El id del sector curso debe ser un string' })
    idSectorCourse: string;
    @ApiProperty({ type: Number, description: 'Nota del sector' })
    @IsNotEmpty({ message: 'La nota del curso no puede estar vacía' })
    @IsNumber({}, { message: 'La nota del curso debe ser un entero' })
    scoreSector: number;
    @ApiProperty({ type: String, description: 'Numero de la carpeta' })
    @IsNotEmpty({ message: 'El id del numero de carpeta no puede estar vacío' })
    @IsString({ message: 'El id del numero de carpeta debe ser un string' })
    folderNumberId: string;
    @ApiProperty({ type: String, description: 'Id del estudiante' })
    @IsNotEmpty({ message: 'El id del estudiante no puede estar vacío' })
    @IsString({ message: 'El id del estudiante debe ser un string' })
    userId: string;
}