export interface Education {
  id: string;
  degreeKey: string;
  /** Institution and place are proper names, not translated. */
  institution: string;
  place: string;
  periodKey: string;
  detailsKey?: string;
}

/** Most recent first. */
export const EDUCATION: readonly Education[] = [
  {
    id: 'postgrad',
    degreeKey: 'education.postgrad.degree',
    institution: 'Faculdade Anhanguera',
    place: 'Online',
    periodKey: 'education.postgrad.period',
  },
  {
    id: 'expert',
    degreeKey: 'education.expert.degree',
    institution: 'LD Treinamentos',
    place: 'Online',
    periodKey: 'education.expert.period',
    detailsKey: 'education.expert.details',
  },
  {
    id: 'bachelor',
    degreeKey: 'education.bachelor.degree',
    institution: 'Universidade Estadual de Goiás (UEG)',
    place: 'Santa Helena de Goiás',
    periodKey: 'education.bachelor.period',
  },
];

export const LANGUAGE_KEYS: readonly string[] = [
  'education.languages.portuguese',
  'education.languages.english',
];
