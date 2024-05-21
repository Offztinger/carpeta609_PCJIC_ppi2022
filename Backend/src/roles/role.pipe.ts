import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";

@Injectable()
export class RolePipe implements PipeTransform {
    constructor(private prisma: PrismaService) { }

    async transform(value: any) {
        const role = await this.prisma.roles.findFirst({
            where: {
                id: value.idRole,
            },
        });

        if (!role) {
            throw new BadRequestException(`El rol no existe`);
        }

        return value;
    }
}

