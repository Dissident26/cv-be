import { Resolver, Query, Mutation, Args, ID, InputType, Field } from '@nestjs/graphql';
import { User, UserType } from './user.types';
import { users } from './mock-data';
import { v4 as uuidv4 } from 'uuid';

@InputType()
class UserInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  departmentId: string;
  @Field()
  positionId: string;
  @Field(() => [String])
  skills: string[];
  @Field(() => [String])
  languages: string[];
}

@Resolver(() => UserType)
export class UserResolver {
  @Query(() => [UserType])
  users(): UserType[] {
    return users;
  }

  @Query(() => UserType, { nullable: true })
  user(@Args('id', { type: () => ID }) id: string): UserType | undefined {
    return users.find(u => u.id === id);
  }

  @Mutation(() => UserType)
  createUser(@Args('input') input: UserInput): UserType {
    const user = { ...input, id: uuidv4() };
    users.push(user);
    return user;
  }

  @Mutation(() => UserType, { nullable: true })
  updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => UserInput, nullable: true }) input: Partial<UserInput>,
  ): UserType | undefined {
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return undefined;
    users[idx] = { ...users[idx], ...input };
    return users[idx];
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => ID }) id: string): boolean {
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    users.splice(idx, 1);
    return true;
  }
} 