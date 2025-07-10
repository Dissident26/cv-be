import { Resolver, Query, Mutation, Args, ID, InputType, Field } from '@nestjs/graphql';
import { Language, LanguageType } from './language.types';
import { languages } from '../mock-data';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

const issuedTokens = require('../user/user.resolver').issuedTokens;

@InputType()
class LanguageInput {
  @Field()
  name: string;
  @Field()
  level: string;
}

@Resolver(() => LanguageType)
@UseGuards(new JwtAuthGuard(issuedTokens))
export class LanguageResolver {
  @Query(() => [LanguageType])
  languages(): LanguageType[] {
    return languages;
  }

  @Query(() => LanguageType, { nullable: true })
  language(@Args('id', { type: () => ID }) id: string): LanguageType | undefined {
    return languages.find(l => l.id === id);
  }

  @Mutation(() => LanguageType)
  createLanguage(@Args('input') input: LanguageInput): LanguageType {
    const language = { ...input, id: uuidv4() };
    languages.push(language);
    return language;
  }

  @Mutation(() => LanguageType, { nullable: true })
  updateLanguage(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => LanguageInput, nullable: true }) input: Partial<LanguageInput>,
  ): LanguageType | undefined {
    const idx = languages.findIndex(l => l.id === id);
    if (idx === -1) return undefined;
    languages[idx] = { ...languages[idx], ...input };
    return languages[idx];
  }

  @Mutation(() => Boolean)
  deleteLanguage(@Args('id', { type: () => ID }) id: string): boolean {
    const idx = languages.findIndex(l => l.id === id);
    if (idx === -1) return false;
    languages.splice(idx, 1);
    return true;
  }
} 