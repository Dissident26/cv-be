import { Module } from '@nestjs/common';
import { PositionResolver } from './position.resolver';

@Module({
  providers: [PositionResolver],
})
export class PositionModule {} 