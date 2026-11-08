export const AVAILABLE_LANGS = ['pt-BR', 'en-US'] as const;

export type Lang = (typeof AVAILABLE_LANGS)[number];

/** Language of the prerendered HTML. The browser switches to the visitor's language on boot. */
export const DEFAULT_LANG: Lang = 'pt-BR';

export const FALLBACK_LANG: Lang = 'en-US';

export const LANG_STORAGE_KEY = 'lang';

export function isLang(value: unknown): value is Lang {
  return AVAILABLE_LANGS.includes(value as Lang);
}

/** `pt*` → pt-BR; anything else → en-US. */
export function langFromBrowser(browserLang: string | null | undefined): Lang {
  return browserLang?.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en-US';
}
