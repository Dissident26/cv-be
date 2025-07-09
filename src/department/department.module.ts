import { Module } from '@nestjs/common';
import { DepartmentResolver } from './department.resolver';

@Module({
  providers: [DepartmentResolver],
})
export class DepartmentModule {} 