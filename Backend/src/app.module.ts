import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './core/database/prisma/prisma.service';
import { configRoot } from './core/config/configurations';
import { DatabaseModule } from './core/database/database.module';
import { StudentModule } from './students/student.module';
import { TeamsModule } from './teams/teams.module';
import { ProfessorModule } from './professor/professor.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AuthModule } from './auth/auth.module';
import { LogbookModule } from './logbook/logbook.module';
import { LogbookDetailModule } from './logbookDetail/logbookDetail.module';
import { CourseModule } from './course/course.module';
import { CourseUserModule } from './courseUser/courseUser.module';
import { MeetingModule } from './meeting/meeting.module';
import { SectorModule } from './sector/sector.module';
import { SectorCourseModule } from './sectorCourse/sectorCourse.module';
import { SectorScoreModule } from './sectorScore/sectorScore.module';
import { TeamMemberModule } from './teamMember/teamMember.module';

@Module({
  imports: [ConfigModule.forRoot(configRoot()), DatabaseModule, StudentModule, TeamsModule, ProfessorModule, ScheduleModule, AuthModule, LogbookModule, LogbookDetailModule, CourseModule, CourseUserModule, MeetingModule, SectorModule, SectorCourseModule, SectorScoreModule, TeamMemberModule],
  providers: [PrismaService],
})
export class AppModule { }
