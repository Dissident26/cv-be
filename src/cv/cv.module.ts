import { Module } from '@nestjs/common';
import { CVResolver } from './cv.resolver';

@Module({
  providers: [CVResolver],
})
export class CVModule {} 