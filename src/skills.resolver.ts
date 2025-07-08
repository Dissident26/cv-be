import { Resolver, Query, Mutation, Args, ID, InputType, Field } from '@nestjs/graphql';
import { Skill, SkillType } from './skills.types';
import { skills } from './mock-data';
import { v4 as uuidv4 } from 'uuid';

@InputType()
class SkillInput {
  @Field()
  name: string;
  @Field()
  description: string;
}

@Resolver(() => SkillType)
export class SkillResolver {
  @Query(() => [SkillType])
  skills(): SkillType[] {
    return skills;
  }

  @Query(() => SkillType, { nullable: true })
  skill(@Args('id', { type: () => ID }) id: string): SkillType | undefined {
    return skills.find(s => s.id === id);
  }

  @Mutation(() => SkillType)
  createSkill(@Args('input') input: SkillInput): SkillType {
    const skill = { ...input, id: uuidv4() };
    skills.push(skill);
    return skill;
  }

  @Mutation(() => SkillType, { nullable: true })
  updateSkill(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: Partial<SkillInput>,
  ): SkillType | undefined {
    const idx = skills.findIndex(s => s.id === id);
    if (idx === -1) return undefined;
    skills[idx] = { ...skills[idx], ...input };
    return skills[idx];
  }

  @Mutation(() => Boolean)
  deleteSkill(@Args('id', { type: () => ID }) id: string): boolean {
    const idx = skills.findIndex(s => s.id === id);
    if (idx === -1) return false;
    skills.splice(idx, 1);
    return true;
  }
} 