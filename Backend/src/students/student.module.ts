import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { RolePipe } from 'src/roles/role.pipe';

@Module({
  controllers: [StudentController],
  providers: [StudentService, PrismaService, RolePipe],
})
export class StudentModule { }