import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CVType {
  @Field(() => ID)
  id?: string;
  @Field({ nullable: true })
  userId?: string;
  @Field()
  summary: string;
  @Field(() => [String], { nullable: "itemsAndList" })
  experience?: string[];
  @Field(() => [String])
  education: string[];
  @Field(() => [String], { nullable: "itemsAndList" })
  skills?: string[];
  @Field(() => [String], { nullable: "itemsAndList" })
  languages?: string[];
  @Field()
  name: string;
}

export interface CV {
  id?: string;
  userId?: string;
  summary: string;
  experience?: string[];
  education: string[];
  skills?: string[];
  languages?: string[];
  name: string;
} 