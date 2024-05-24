import { HttpException, HttpStatus } from '@nestjs/common';

export class UndefinedException extends HttpException {
    constructor(message: string = 'El valor del param es indefinido') {
        super(message, HttpStatus.FORBIDDEN);
    }
}