import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PositionType {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  description: string;
}

export interface Position {
  id: string;
  name: string;
  description: string;
} 