import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserDTO {
    id: string;

    @ApiProperty({ type: Number, description: 'Número de documento' })
    @IsNumber({}, { message: 'El número de documento debe ser un número' })
    @IsNotEmpty({ message: 'El número de documento no puede estar vacío' })
    documentNumber: number;

    @ApiProperty({ type: String, description: 'Email' })
    @IsEmail({}, { message: 'El email debe ser un email válido' })
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    email: string;

    @ApiProperty({ type: String, description: 'Contraseña' })
    @IsString({ message: 'La contraseña debe ser un string' })
    password: string;

    @ApiProperty({ type: String, description: 'Nombre' })
    @IsString({ message: 'El nombre debe ser un string' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    name: string;

    @ApiProperty({ type: String, description: 'Apellido' })
    @IsString({ message: 'El apellido debe ser un string' })
    @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
    lastName: string;

    @ApiProperty({ type: String, description: 'Rol' })
    @IsString({ message: 'El rol debe ser un string' })
    @IsNotEmpty({ message: 'El rol no puede estar vacío' })
    idRole: string;
}