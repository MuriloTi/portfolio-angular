export interface Highlight {
  /** Not translated: numbers read the same in both languages. */
  value: string;
  labelKey: string;
}

export const ABOUT_PARAGRAPH_KEYS: readonly string[] = ['about.p1', 'about.p2', 'about.p3'];

export const ABOUT_HIGHLIGHTS: readonly Highlight[] = [
  { value: '5+', labelKey: 'about.highlights.years' },
  { value: '50M', labelKey: 'about.highlights.lines' },
  { value: '~50', labelKey: 'about.highlights.files' },
  { value: '1', labelKey: 'about.highlights.erp' },
];
