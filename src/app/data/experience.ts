export interface Experience {
  id: string;
  /** Company names are not translated. */
  company: string;
  roleKey: string;
  periodKey: string;
  locationKey: string;
  bulletKeys: readonly string[];
}

const bullets = (id: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) => `experience.${id}.b${i + 1}`);

/** Most recent first. */
export const EXPERIENCES: readonly Experience[] = [
  {
    id: 'codecycle',
    company: 'Codecycle',
    roleKey: 'experience.codecycle.role',
    periodKey: 'experience.codecycle.period',
    locationKey: 'experience.remote',
    bulletKeys: bullets('codecycle', 4),
  },
  {
    id: 'rivema',
    company: 'Grupo Rivema',
    roleKey: 'experience.rivema.role',
    periodKey: 'experience.rivema.period',
    locationKey: 'experience.rioVerde',
    bulletKeys: bullets('rivema', 4),
  },
  {
    id: 'gordon',
    company: 'Hospital Presbiteriano Dr. Gordon',
    roleKey: 'experience.gordon.role',
    periodKey: 'experience.gordon.period',
    locationKey: 'experience.rioVerde',
    bulletKeys: bullets('gordon', 3),
  },
];
