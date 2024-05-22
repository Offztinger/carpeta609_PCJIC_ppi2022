import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";

@Injectable()
export class CoursePipe implements PipeTransform {
    constructor(private prisma: PrismaService) { }

    async transform(value: any) {
        const course = await this.prisma.course.findFirst({
            where: {
                id: value.idCourse,
            },
        });

        if (!course) {
            throw new BadRequestException(`El curso al que quieres relacionar no existe`);
        }

        return value;
    }
}

