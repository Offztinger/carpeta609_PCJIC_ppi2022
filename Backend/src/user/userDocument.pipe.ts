import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";

@Injectable()
export class UserDocumentPipe implements PipeTransform {
    constructor(private prisma: PrismaService) { }

    async transform(value: any) {
        const userDocument = await this.prisma.user.findFirst({
            where: {
                documentNumber: value.documentNumber,
            },
        });

        if (userDocument) {
            throw new BadRequestException(`Ya existe un usuario con esta cedula.`);
        }

        return value;
    }
}