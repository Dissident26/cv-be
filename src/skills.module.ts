import { Module } from '@nestjs/common';
import { SkillResolver } from './skills.resolver';

@Module({
  providers: [SkillResolver],
})
export class SkillsModule {} 