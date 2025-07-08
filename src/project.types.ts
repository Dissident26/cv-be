import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ProjectType {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  startDate: string;
  @Field()
  endDate: string;
  @Field(() => [String])
  members: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  members: string[];
} 