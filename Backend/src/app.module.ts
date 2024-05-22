import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './core/database/prisma/prisma.service';
import { configRoot } from './core/config/configurations';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { StudentModule } from './students/student.module';
import { TeamsModule } from './teams/teams.module';
import { ProfessorModule } from './professor/professor.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AuthModule } from './auth/auth.module';
import { LogbookModule } from './logbook/logbook.module';
import { LogbookDetailModule } from './logbookDetail/logbookDetail.module';
import { CourseModule } from './course/course.module';
import { CourseStudentModule } from './courseStudent/courseStudent.module';
import { CourseProfessorModule } from './courseProfessor/courseProfessor.module';

@Module({
  imports: [ConfigModule.forRoot(configRoot()), DatabaseModule, StudentModule, TeamsModule, ProfessorModule, ScheduleModule, AuthModule, LogbookModule, LogbookDetailModule, CourseModule, CourseStudentModule, CourseProfessorModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
