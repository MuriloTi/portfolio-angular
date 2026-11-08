import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';

import { FALLBACK_LANG, isLang } from './i18n';

/**
 * Loads translations with dynamic `import()` instead of HTTP.
 * The JSON files are bundled as lazy chunks, so this works the same during prerender and in the
 * browser, and is not affected by the `base-href` used on GitHub Pages.
 */
@Injectable({ providedIn: 'root' })
export class TranslocoImportLoader implements TranslocoLoader {
  async getTranslation(lang: string): Promise<Translation> {
    const safeLang = isLang(lang) ? lang : FALLBACK_LANG;
    const module = (await import(`../../i18n/${safeLang}.json`)) as { default: Translation };
    return module.default;
  }
}
