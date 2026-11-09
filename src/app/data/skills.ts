export interface SkillChip {
  /** Technology name (shown as is) or, when `translate` is true, an i18n key. */
  text: string;
  translate?: boolean;
}

export interface SkillGroup {
  id: string;
  titleKey: string;
  chips: readonly SkillChip[];
}

const names = (...items: string[]): SkillChip[] => items.map((text) => ({ text }));
const key = (text: string): SkillChip => ({ text, translate: true });

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: 'backend',
    titleKey: 'skills.groups.backend',
    chips: names(
      'C#',
      '.NET (Core 3.1 → .NET 10)',
      'ASP.NET Core',
      'ASP.NET MVC',
      'Entity Framework Core',
      'MediatR',
      'REST APIs',
    ),
  },
  {
    id: 'frontend',
    titleKey: 'skills.groups.frontend',
    chips: names(
      'Angular (15+)',
      'AngularJS',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Bootstrap',
      'Angular Material',
    ),
  },
  {
    id: 'databases',
    titleKey: 'skills.groups.databases',
    chips: [...names('SQL Server', 'T-SQL', 'Stored Procedures'), key('skills.chips.reporting')],
  },
  {
    id: 'cloud',
    titleKey: 'skills.groups.cloud',
    chips: [
      ...names('Azure Functions', 'Azure Blob Storage'),
      key('skills.chips.gcpBasic'),
      ...names('Docker', 'CI/CD'),
    ],
  },
  {
    id: 'messaging',
    titleKey: 'skills.groups.messaging',
    chips: names('RabbitMQ', 'Azure Service Bus'),
  },
  {
    id: 'architecture',
    titleKey: 'skills.groups.architecture',
    chips: names(
      'Clean Architecture',
      'Hexagonal',
      'Modular Monolith',
      'Microservices',
      'CQRS',
      'Repository',
      'Unit of Work',
      'SOLID',
    ),
  },
  {
    id: 'quality',
    titleKey: 'skills.groups.quality',
    chips: [
      key('skills.chips.unitTesting'),
      ...names('TDD'),
      key('skills.chips.caching'),
      ...names('Agile / Scrum'),
    ],
  },
  {
    id: 'business',
    titleKey: 'skills.groups.business',
    chips: [key('skills.chips.protheus')],
  },
];
