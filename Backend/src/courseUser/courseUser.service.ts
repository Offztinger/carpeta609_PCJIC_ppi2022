import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { CourseUserDTO } from "src/dto/CourseDTO";
import * as XLSX from 'xlsx';
@Injectable()
export class CourseUserService {
    constructor(private prisma: PrismaService) { }

    async createCourseUser(data: CourseUserDTO) {
        return this.prisma.courseUser.create({
            data,
        });
    }

    async findAllCourseUsers() {
        return await this.prisma.courseUser.findMany({
            include: {
                User: true,
                Course: true,
            },
        });
    }

    async processXlsx(fileBuffer: any) {
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const errors = [];

        for (const row of sheet) {
            try {
                const courseUserDTO: CourseUserDTO = {
                    idUser: row['idUser'],
                    idCourse: row['idCourse'],
                    active: row['active'],
                };

                if (!courseUserDTO.idUser || !courseUserDTO.idCourse || !courseUserDTO.active) {
                    throw new Error('Missing required fields');
                }

                // Validar que el correo electrónico termine con @elpoli.edu.co

                const existingCourseUser = await this.prisma.courseUser.findFirst({
                    where: { idUser: courseUserDTO.idUser, idCourse: courseUserDTO.idCourse, active: courseUserDTO.active },
                });

                if (existingCourseUser) {
                    await this.updateCourseUser(existingCourseUser.id, courseUserDTO);
                } else {
                    await this.createCourseUser(courseUserDTO);
                }
            } catch (error) {
                errors.push({ row, error: error.message });
            }
        }

        return { errors };
    }

    async findCourseUserById(id: string) {
        return await this.prisma.courseUser.findUnique({
            where: { id },
        });
    }

    async updateCourseUser(id: string, data: CourseUserDTO) {
        return this.prisma.courseUser.update({
            where: { id },
            data,
        });
    }

    async deleteCourseUser(id: string) {
        return this.prisma.courseUser.delete({
            where: { id },
        });
    }

}
