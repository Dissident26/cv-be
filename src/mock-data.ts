import { User } from './user';
import { Project } from './project';
import { CV } from './cv';
import { Department } from './department';
import { Position } from './position';
import { Skill } from './skills';
import { Language } from './language';
import { faker } from '@faker-js/faker';

export const users: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: `user${i+1}`,
  username: faker.internet.username(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  departmentId: `dept${(i%3)+1}`,
  positionId: `pos${(i%4)+1}`,
  skills: [`skill${(i%5)+1}`],
  languages: [faker.location.language().name],
}));

export const projects: Project[] = Array.from({ length: 100 }, (_, i) => ({
  id: `proj${i+1}`,
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  startDate: faker.date.past().toISOString().split('T')[0],
  endDate: faker.date.future().toISOString().split('T')[0],
  members: [`user${(i%10)+1}`],
}));

export const cvs: CV[] = Array.from({ length: 100 }, (_, i) => ({
  id: `cv${i+1}`,
  userId: `user${i+1}`,
  summary: faker.lorem.sentence(),
  experience: [faker.lorem.sentence()],
  education: [faker.lorem.sentence()],
  skills: [`skill${(i%5)+1}`],
  languages: [faker.location.language().name],
}));

export const departments: Department[] = Array.from({ length: 10 }, (_, i) => ({
  id: `dept${i+1}`,
  name: faker.commerce.department(),
  description: faker.company.catchPhrase(),
}));

export const positions: Position[] = Array.from({ length: 10 }, (_, i) => ({
  id: `pos${i+1}`,
  name: faker.person.jobTitle(),
  description: faker.person.jobDescriptor(),
}));

export const skills: Skill[] = Array.from({ length: 50 }, (_, i) => ({
  id: `skill${i+1}`,
  name: faker.hacker.noun(),
  description: faker.hacker.phrase(),
}));

export const languages: Language[] = Array.from({ length: 50 }, (_, i) => ({
  id: `lang${i+1}`,
  name: faker.location.language().name,
  level: ['A1','A2','B1','B2','C1','C2'][i%6],
})); 

console.log(users.slice(0, 3));