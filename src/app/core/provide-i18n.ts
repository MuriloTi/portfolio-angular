import { EnvironmentProviders, inject, isDevMode, provideAppInitializer } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';

import { AVAILABLE_LANGS, DEFAULT_LANG, FALLBACK_LANG } from './i18n';
import { LanguageService } from './language.service';
import { TranslocoImportLoader } from './transloco-loader';

/** Transloco setup plus an initializer that loads the starting language before the first render. */
export function provideI18n(): EnvironmentProviders[] {
  return [
    ...provideTransloco({
      config: {
        availableLangs: [...AVAILABLE_LANGS],
        defaultLang: DEFAULT_LANG,
        fallbackLang: FALLBACK_LANG,
        missingHandler: {
          useFallbackTranslation: true,
          logMissingKey: isDevMode(),
        },
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoImportLoader,
    }),
    provideAppInitializer(() => inject(LanguageService).init()),
  ];
}
