import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  departmentId?: string;

  @Field({ nullable: true })
  positionId?: string;

  @Field(() => [String], { nullable: true })
  skills?: string[] = [];

  @Field(() => [String], { nullable: true })
  languages?: string[] = [];
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  departmentId?: string;
  positionId?: string;
  skills?: string[];
  languages?: string[];
}

export { LoginResponse, LoginInput } from './user.resolver';