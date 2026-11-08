export interface NavItem {
  /** Section element id (anchor target). */
  id: string;
  labelKey: string;
}

/** Links shown in the header, in page order. */
export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'about', labelKey: 'nav.about' },
  { id: 'skills', labelKey: 'nav.skills' },
  { id: 'experience', labelKey: 'nav.experience' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'contact', labelKey: 'nav.contact' },
];
