import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  InputType,
  Field,
  ObjectType,
} from '@nestjs/graphql';
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
  email: string;
  @Field()
  password: string;
}

@InputType()
class UserInput {
  @Field({ nullable: true })
  username?: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;
  @Field({ nullable: true })
  departmentId?: string;
  @Field({ nullable: true })
  positionId?: string;
  @Field(() => [String], { nullable: true })
  skills?: string[];
  @Field(() => [String], { nullable: true })
  languages?: string[];
}

@Resolver(() => UserType)
export class UserResolver {
  @Query(() => [UserType])
  @UseGuards(new JwtAuthGuard(issuedTokens))
  users(): UserType[] {
    return users.map(({ password, ...rest }) => rest);
  }

  @Query(() => UserType, { nullable: true })
  @UseGuards(new JwtAuthGuard(issuedTokens))
  user(@Args('id', { type: () => ID }) id: string): UserType | undefined {
    const user = users.find((u) => u.id === id);
    if (!user) return undefined;
    const { password, ...rest } = user;
    return rest;
  }

  @Mutation(() => UserType)
  createUser(@Args('input') input: UserInput): UserType {
    const user = {
      ...input,
      id: uuidv4(),
      firstName: input.firstName ?? '',
      lastName: input.lastName ?? '',
      departmentId: input.departmentId ?? '',
      positionId: input.positionId ?? '',
      skills: input.skills ?? [],
      languages: input.languages ?? [],
      username: input.username ?? '',
    };
    users.push(user);
    const { password, ...rest } = user;
    return rest;
  }

  @Mutation(() => UserType, { nullable: true })
  @UseGuards(new JwtAuthGuard(issuedTokens))
  updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => UserInput, nullable: true })
    input: Partial<UserInput>,
  ): UserType | undefined {
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return undefined;
    users[idx] = {
      ...users[idx],
      ...input,
      firstName: input.firstName ?? users[idx].firstName ?? '',
      lastName: input.lastName ?? users[idx].lastName ?? '',
      departmentId: input.departmentId ?? users[idx].departmentId ?? '',
      positionId: input.positionId ?? users[idx].positionId ?? '',
      skills: input.skills ?? users[idx].skills ?? [],
      languages: input.languages ?? users[idx].languages ?? [],
      username: input.username ?? users[idx].username ?? '',
    };
    const { password, ...rest } = users[idx];
    return rest;
  }

  @Mutation(() => Boolean)
  @UseGuards(new JwtAuthGuard(issuedTokens))
  deleteUser(@Args('id', { type: () => ID }) id: string): boolean {
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return false;
    users.splice(idx, 1);
    return true;
  }

  @Mutation(() => LoginResponse, { nullable: true })
  login(@Args('input') input: LoginInput): LoginResponse | null {
    const user = users.find(
      (u) => u.email === input.email && u.password === input.password,
    );
    if (!user) return null;
    const payload = { sub: user.id, username: user.username ?? '' };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    issuedTokens.add(accessToken);
    const { password, ...userWithoutPassword } = user;
    return { accessToken, user: userWithoutPassword };
  }
}

export { LoginResponse, LoginInput };
