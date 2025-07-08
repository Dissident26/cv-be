import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class DepartmentType {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  description: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
} 