import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';

import { DEFAULT_LANG, isLang, Lang, LANG_STORAGE_KEY, langFromBrowser } from './i18n';

/**
 * Active language state.
 *
 * - Prerender (server): always `pt-BR`.
 * - Browser: saved choice in `localStorage` (key `lang`) → browser language (`pt*` → pt-BR,
 *   anything else → en-US).
 * - Every change updates `<html lang>`, `<title>` and `<meta name="description">`.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly current = signal<Lang>(DEFAULT_LANG);

  readonly lang = this.current.asReadonly();

  /** Called once by the app initializer, before the first render. */
  init(): Promise<void> {
    const initial = this.isBrowser ? this.resolveBrowserLang() : DEFAULT_LANG;
    return this.activate(initial);
  }

  /** Switch language from the UI and remember the choice. */
  async setLang(lang: Lang): Promise<void> {
    await this.activate(lang);
    this.writeStoredLang(lang);
  }

  private async activate(lang: Lang): Promise<void> {
    // Load first so the UI never renders untranslated keys.
    // `defaultValue`: the stream completes without emitting if the app is destroyed mid-load.
    await firstValueFrom(this.transloco.load(lang), { defaultValue: undefined });
    this.transloco.setActiveLang(lang);
    this.current.set(lang);
    this.updateDocument(lang);
  }

  private updateDocument(lang: Lang): void {
    this.document.documentElement.lang = lang;
    this.title.setTitle(this.translate('meta.title', lang));
    this.meta.updateTag({ name: 'description', content: this.translate('meta.description', lang) });
  }

  private translate(key: string, lang: Lang): string {
    return this.transloco.translate<string | undefined>(key, {}, lang) ?? '';
  }

  private resolveBrowserLang(): Lang {
    return this.readStoredLang() ?? langFromBrowser(this.document.defaultView?.navigator.language);
  }

  private readStoredLang(): Lang | null {
    try {
      const value = this.document.defaultView?.localStorage.getItem(LANG_STORAGE_KEY);
      return isLang(value) ? value : null;
    } catch {
      return null; // Storage blocked.
    }
  }

  private writeStoredLang(lang: Lang): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      this.document.defaultView?.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore: the choice still applies for this visit.
    }
  }
}
