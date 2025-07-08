import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import type { Request } from 'express';
// Feature modules (to be implemented)
import { UserModule } from './user.module';
import { ProjectModule } from './project.module';
import { CVModule } from './cv.module';
import { DepartmentModule } from './department.module';
import { PositionModule } from './position.module';
import { SkillsModule } from './skills.module';
import { LanguageModule } from './language.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      context: ({ req }: { req: Request }) => ({ req }),
      path: '/api',
    }),
    UserModule,
    ProjectModule,
    CVModule,
    DepartmentModule,
    PositionModule,
    SkillsModule,
    LanguageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
