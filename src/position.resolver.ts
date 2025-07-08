import { Resolver, Query, Mutation, Args, ID, InputType, Field } from '@nestjs/graphql';
import { Position, PositionType } from './position.types';
import { positions } from './mock-data';
import { v4 as uuidv4 } from 'uuid';

@InputType()
class PositionInput {
  @Field()
  name: string;
  @Field()
  description: string;
}

@Resolver(() => PositionType)
export class PositionResolver {
  @Query(() => [PositionType])
  positions(): PositionType[] {
    return positions;
  }

  @Query(() => PositionType, { nullable: true })
  position(@Args('id', { type: () => ID }) id: string): PositionType | undefined {
    return positions.find(p => p.id === id);
  }

  @Mutation(() => PositionType)
  createPosition(@Args('input') input: PositionInput): PositionType {
    const position = { ...input, id: uuidv4() };
    positions.push(position);
    return position;
  }

  @Mutation(() => PositionType, { nullable: true })
  updatePosition(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => PositionInput, nullable: true }) input: Partial<PositionInput>,
  ): PositionType | undefined {
    const idx = positions.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    positions[idx] = { ...positions[idx], ...input };
    return positions[idx];
  }

  @Mutation(() => Boolean)
  deletePosition(@Args('id', { type: () => ID }) id: string): boolean {
    const idx = positions.findIndex(p => p.id === id);
    if (idx === -1) return false;
    positions.splice(idx, 1);
    return true;
  }
} 