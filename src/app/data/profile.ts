import { IconName } from '../shared/icon/icon';

export const PROFILE = {
  name: 'Murilo Barros Cardoso',
  shortName: 'Murilo Cardoso',
  monogram: 'MB',
  /**
   * Hero photo: square head-and-shoulders crop of `images/profile.jpeg` (1086×1448; region
   * x 46–1086, y 90–1130, resized to 610×610), exported as WebP (~13 KB). The original is kept
   * for `og:image`.
   */
  photo: { src: 'images/profile-hero.webp', width: 610, height: 610 },
  cv: 'cv/Murilo-Barros-Cardoso-CV.pdf',
} as const;

export interface SocialLink {
  id: 'email' | 'linkedin' | 'github';
  /** i18n key for the visible/accessible label. */
  labelKey: string;
  href: string;
  icon: IconName;
  external: boolean;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: 'linkedin',
    labelKey: 'social.linkedin',
    href: 'https://www.linkedin.com/in/murilo-barros-cardoso-055b58102',
    icon: 'linkedin',
    external: true,
  },
  {
    id: 'github',
    labelKey: 'social.github',
    href: 'https://github.com/MuriloTi',
    icon: 'github',
    external: true,
  },
  {
    id: 'email',
    labelKey: 'social.email',
    href: 'mailto:murilo.ti.7@gmail.com',
    icon: 'mail',
    external: false,
  },
];
