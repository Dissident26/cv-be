import { User } from './user.types';
import { Project } from './project.types';
import { CV } from './cv.types';
import { Department } from './department.types';
import { Position } from './position.types';
import { Skill } from './skills.types';
import { Language } from './language.types';

export const users: User[] = Array.from({ length: 10 }, (_, i) => ({
  id: `user${i+1}`,
  username: `user${i+1}`,
  email: `user${i+1}@example.com`,
  password: `password${i+1}`,
  firstName: `First${i+1}`,
  lastName: `Last${i+1}`,
  departmentId: `dept${(i%3)+1}`,
  positionId: `pos${(i%4)+1}`,
  skills: [`skill${(i%5)+1}`],
  languages: [`lang${(i%3)+1}`],
}));

export const projects: Project[] = Array.from({ length: 10 }, (_, i) => ({
  id: `proj${i+1}`,
  name: `Project ${i+1}`,
  description: `Description for project ${i+1}`,
  startDate: `2023-01-${(i%28)+1}`,
  endDate: `2023-12-${(i%28)+1}`,
  members: [`user${(i%10)+1}`],
}));

export const cvs: CV[] = Array.from({ length: 10 }, (_, i) => ({
  id: `cv${i+1}`,
  userId: `user${i+1}`,
  summary: `Summary for user${i+1}`,
  experience: [`Experience ${i+1}`],
  education: [`Education ${i+1}`],
  skills: [`skill${(i%5)+1}`],
  languages: [`lang${(i%3)+1}`],
}));

export const departments: Department[] = Array.from({ length: 10 }, (_, i) => ({
  id: `dept${i+1}`,
  name: `Department ${i+1}`,
  description: `Description for department ${i+1}`,
}));

export const positions: Position[] = Array.from({ length: 10 }, (_, i) => ({
  id: `pos${i+1}`,
  name: `Position ${i+1}`,
  description: `Description for position ${i+1}`,
}));

export const skills: Skill[] = Array.from({ length: 10 }, (_, i) => ({
  id: `skill${i+1}`,
  name: `Skill ${i+1}`,
  description: `Description for skill ${i+1}`,
}));

export const languages: Language[] = Array.from({ length: 10 }, (_, i) => ({
  id: `lang${i+1}`,
  name: `Language ${i+1}`,
  level: ['A1','A2','B1','B2','C1','C2'][i%6],
})); 