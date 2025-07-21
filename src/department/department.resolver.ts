import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  InputType,
  Field,
} from '@nestjs/graphql';
import { Department, DepartmentType } from './department.types';
import { departments } from '../mock-data';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { issuedTokens } from 'src/user';

@InputType()
class DepartmentInput {
  @Field()
  name: string;
  @Field()
  description: string;
}

@Resolver(() => DepartmentType)
@UseGuards(new JwtAuthGuard(issuedTokens))
export class DepartmentResolver {
  @Query(() => [DepartmentType])
  departments(): DepartmentType[] {
    return departments;
  }

  @Query(() => DepartmentType, { nullable: true })
  department(
    @Args('id', { type: () => ID }) id: string,
  ): DepartmentType | undefined {
    return departments.find((d) => d.id === id);
  }

  @Mutation(() => DepartmentType)
  createDepartment(@Args('input') input: DepartmentInput): DepartmentType {
    const department = { ...input, id: uuidv4() };
    departments.push(department);
    return department;
  }

  @Mutation(() => DepartmentType, { nullable: true })
  updateDepartment(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => DepartmentInput, nullable: true })
    input: Partial<DepartmentInput>,
  ): DepartmentType | undefined {
    const idx = departments.findIndex((d) => d.id === id);
    if (idx === -1) return undefined;
    departments[idx] = { ...departments[idx], ...input };
    return departments[idx];
  }

  @Mutation(() => Boolean)
  deleteDepartment(@Args('id', { type: () => ID }) id: string): boolean {
    const idx = departments.findIndex((d) => d.id === id);
    if (idx === -1) return false;
    departments.splice(idx, 1);
    return true;
  }
}
