import { Resolver, Query, Mutation, Args, ID, InputType, Field, ObjectType } from '@nestjs/graphql';
import { User, UserType } from './user.types';
import { users } from '../mock-data';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

const JWT_SECRET = 'dev_secret'; // In production, use env vars
const issuedTokens = new Set<string>(); // In-memory token store

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => UserType)
  user: UserType;
}

@InputType()
class LoginInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

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
@UseGuards(new JwtAuthGuard(issuedTokens))
export class UserResolver {
  @Query(() => [UserType])
  users(): UserType[] {
    return users.map(({ password, ...rest }) => rest);
  }

  @Query(() => UserType, { nullable: true })
  user(@Args('id', { type: () => ID }) id: string): UserType | undefined {
    const user = users.find(u => u.id === id);
    if (!user) return undefined;
    const { password, ...rest } = user;
    return rest;
  }

  @Mutation(() => UserType)
  @UseGuards() // No guard for createUser
  createUser(@Args('input') input: UserInput): UserType {
    const user = { ...input, id: uuidv4() };
    users.push(user);
    const { password, ...rest } = user;
    return rest;
  }

  @Mutation(() => UserType, { nullable: true })
  updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => UserInput, nullable: true }) input: Partial<UserInput>,
  ): UserType | undefined {
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return undefined;
    users[idx] = { ...users[idx], ...input };
    const { password, ...rest } = users[idx];
    return rest;
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => ID }) id: string): boolean {
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    users.splice(idx, 1);
    return true;
  }

  @Mutation(() => LoginResponse, { nullable: true })
  @UseGuards() // No guard for login
  login(@Args('input') input: LoginInput): LoginResponse | null {
    const user = users.find(u => u.username === input.username && u.password === input.password);
    if (!user) return null;
    const payload = { sub: user.id, username: user.username };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    issuedTokens.add(accessToken);
    const { password, ...userWithoutPassword } = user;
    return { accessToken, user: userWithoutPassword };
  }
}

export { LoginResponse, LoginInput }; 