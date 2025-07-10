import { Resolver, Query, Mutation, Args, ID, InputType, Field } from '@nestjs/graphql';
import { Project, ProjectType } from './project.types';
import { projects } from '../mock-data';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

const issuedTokens = require('../user/user.resolver').issuedTokens;

@InputType()
class ProjectInput {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  startDate: string;
  @Field()
  endDate: string;
  @Field(() => [String])
  members: string[];
}

@Resolver(() => ProjectType)
@UseGuards(new JwtAuthGuard(issuedTokens))
export class ProjectResolver {
  @Query(() => [ProjectType])
  projects(): ProjectType[] {
    return projects;
  }

  @Query(() => ProjectType, { nullable: true })
  project(@Args('id', { type: () => ID }) id: string): ProjectType | undefined {
    return projects.find(p => p.id === id);
  }

  @Mutation(() => ProjectType)
  createProject(@Args('input') input: ProjectInput): ProjectType {
    const project = { ...input, id: uuidv4() };
    projects.push(project);
    return project;
  }

  @Mutation(() => ProjectType, { nullable: true })
  updateProject(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => ProjectInput, nullable: true }) input: Partial<ProjectInput>,
  ): ProjectType | undefined {
    const idx = projects.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    projects[idx] = { ...projects[idx], ...input };
    return projects[idx];
  }

  @Mutation(() => Boolean)
  deleteProject(@Args('id', { type: () => ID }) id: string): boolean {
    const idx = projects.findIndex(p => p.id === id);
    if (idx === -1) return false;
    projects.splice(idx, 1);
    return true;
  }
} 