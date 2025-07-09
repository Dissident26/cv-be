import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class LanguageType {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  level: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
} 