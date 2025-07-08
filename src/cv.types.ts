import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CVType {
  @Field(() => ID)
  id: string;
  @Field()
  userId: string;
  @Field()
  summary: string;
  @Field(() => [String])
  experience: string[];
  @Field(() => [String])
  education: string[];
  @Field(() => [String])
  skills: string[];
  @Field(() => [String])
  languages: string[];
}

export interface CV {
  id: string;
  userId: string;
  summary: string;
  experience: string[];
  education: string[];
  skills: string[];
  languages: string[];
} 