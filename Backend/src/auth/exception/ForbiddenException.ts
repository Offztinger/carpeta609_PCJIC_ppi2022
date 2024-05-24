import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
    constructor(message: string = 'No se tienen permisos suficientes') {
        super(message, HttpStatus.FORBIDDEN);
    }
}