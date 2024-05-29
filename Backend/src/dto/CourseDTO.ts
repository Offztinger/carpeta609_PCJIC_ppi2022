import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CourseDTO {
    id: string

    @ApiProperty({ type: String, description: 'Nombre del curso' })
    @IsNotEmpty({ message: 'El nombre del curso no puede estar vacío' })
    @IsString({ message: 'El nombre del curso debe ser un string' })
    courseName: string

    @ApiProperty({ type: String, description: 'Descripción del curso' })
    @IsNotEmpty({ message: 'La descripción del curso no puede estar vacía' })
    @IsString({ message: 'La descripción del curso debe ser un string' })
    courseDescription: string

    @ApiProperty({ type: Number, description: 'Nivel del curso' })
    @IsNotEmpty({ message: 'El nivel del curso no puede estar vacío' })
    @IsNumber({}, { message: 'El nivel del curso debe ser un número' })
    courseLevel: number

    @ApiProperty({ type: Boolean, description: 'Estado del curso' })
    @IsNotEmpty({ message: 'El estado de modulo sol alternativo no puede estar vacío' })
    @IsBoolean({ message: 'El estado de modulo sol alternativo debe ser un booleano' })
    isAlternative: boolean
}


export class CourseUserDTO {
    id: string

    @ApiProperty({ type: String, description: 'Id del usuario' })
    @IsNotEmpty({ message: 'El idUser no puede estar vacío' })
    @IsString({ message: 'El idUser debe ser un string' })
    idUser: string
    @ApiProperty({ type: String, description: 'Id del curso' })
    @IsNotEmpty({ message: 'El idCourse no puede estar vacío' })
    @IsBoolean({ message: 'El idCourse debe ser un booleano' })
    idCourse: string
    @ApiProperty({ type: Boolean, description: 'Estado del curso' })
    @IsNotEmpty({ message: 'El estado active no puede estar vacío' })
    @IsBoolean({ message: 'El estado active debe ser un booleano' })
    active: boolean
}