import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  InputType,
  Field,
} from '@nestjs/graphql';
import { CV, CVType } from './cv.types';
import { cvs } from '../mock-data';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { issuedTokens } from 'src/user';

@InputType()
class CVInput {
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

@Resolver(() => CVType)
@UseGuards(new JwtAuthGuard(issuedTokens))
export class CVResolver {
  @Query(() => [CVType])
  cvs(): CVType[] {
    return cvs;
  }

  @Query(() => CVType, { nullable: true })
  cv(@Args('id', { type: () => ID }) id: string): CVType | undefined {
    return cvs.find((c) => c.id === id);
  }

  @Mutation(() => CVType)
  createCV(@Args('input') input: CVInput): CVType {
    const cv = { ...input, id: uuidv4() };
    cvs.push(cv);
    return cv;
  }

  @Mutation(() => CVType, { nullable: true })
  updateCV(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => CVInput, nullable: true })
    input: Partial<CVInput>,
  ): CVType | undefined {
    const idx = cvs.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    cvs[idx] = { ...cvs[idx], ...input };
    return cvs[idx];
  }

  @Mutation(() => Boolean)
  deleteCV(@Args('id', { type: () => ID }) id: string): boolean {
    const idx = cvs.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    cvs.splice(idx, 1);
    return true;
  }
}
