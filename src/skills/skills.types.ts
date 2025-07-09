import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SkillType {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
} 