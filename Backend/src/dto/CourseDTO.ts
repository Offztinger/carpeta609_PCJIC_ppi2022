import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class CourseDTO {
    id: string

    @IsNotEmpty({ message: 'El nombre del curso no puede estar vacío' })
    @IsString({ message: 'El nombre del curso debe ser un string' })
    courseName: string

    @IsNotEmpty({ message: 'La descripción del curso no puede estar vacía' })
    @IsString({ message: 'La descripción del curso debe ser un string' })
    courseDescription: string

    @IsNotEmpty({ message: 'El id del profesor no puede estar vacío' })
    @IsString({ message: 'El id del profesor debe ser un string' })
    idProfessor: string

    @IsNotEmpty({ message: 'El nivel del curso no puede estar vacío' })
    @IsNumber({}, { message: 'El nivel del curso debe ser un número' })
    courseLevel: number
}

export class CourseStudentDTO {
    idCourseStudent: string

    @IsNotEmpty({ message: 'El idUser no puede estar vacío' })
    @IsString({ message: 'El idUser debe ser un string' })
    idUser: string
    @IsNotEmpty({ message: 'El idCourse no puede estar vacío' })
    @IsBoolean({ message: 'El idCourse debe ser un booleano' })
    idCourse: string
    @IsNotEmpty({ message: 'El estado active no puede estar vacío' })
    @IsBoolean({ message: 'El estado active debe ser un booleano' })
    active: boolean
}

export class CourseProfessorDTO {
    idCourseProfessor: string

    @IsNotEmpty({ message: 'El idUser no puede estar vacío' })
    @IsString({ message: 'El idUser debe ser un string' })
    idUser: string
    @IsNotEmpty({ message: 'El idCourse no puede estar vacío' })
    @IsBoolean({ message: 'El idCourse debe ser un booleano' })
    idCourse: string
    @IsNotEmpty({ message: 'El estado active no puede estar vacío' })
    @IsBoolean({ message: 'El estado active debe ser un booleano' })
    active: boolean
}