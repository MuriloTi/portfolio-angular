import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, DestroyRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

/**
 * Light/dark theme state.
 *
 * - First visit follows `prefers-color-scheme` (and keeps following it while the visitor has no
 *   saved choice).
 * - `toggle()` saves the choice in `localStorage` (key `theme`), which then takes precedence.
 * - The inline script in `index.html` applies `data-theme` before Angular boots; this service reads
 *   that value so both stay in sync. On the server (prerender) it defaults to `light` and never
 *   touches browser-only APIs.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly current = signal<Theme>(this.resolveInitialTheme());

  readonly theme = this.current.asReadonly();
  readonly isDark = computed(() => this.current() === 'dark');

  constructor() {
    if (this.isBrowser) {
      this.apply(this.current());
      this.followSystemPreference();
    }
  }

  toggle(): void {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this.current.set(theme);
    this.apply(theme);
    this.writeStoredTheme(theme);
  }

  private resolveInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'light';
    }
    const fromDom = this.document.documentElement.getAttribute('data-theme');
    if (isTheme(fromDom)) {
      return fromDom;
    }
    return this.readStoredTheme() ?? (this.systemPrefersDark() ? 'dark' : 'light');
  }

  /** While the visitor has not chosen a theme, mirror OS-level changes live. */
  private followSystemPreference(): void {
    const media = this.matchMedia();
    if (!media) {
      return;
    }
    const onChange = (event: MediaQueryListEvent) => {
      if (this.readStoredTheme() === null) {
        const theme: Theme = event.matches ? 'dark' : 'light';
        this.current.set(theme);
        this.apply(theme);
      }
    };
    media.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => media.removeEventListener('change', onChange));
  }

  private apply(theme: Theme): void {
    this.document.documentElement.setAttribute('data-theme', theme);
  }

  private systemPrefersDark(): boolean {
    return this.matchMedia()?.matches ?? false;
  }

  private matchMedia(): MediaQueryList | null {
    const view = this.document.defaultView;
    return view && typeof view.matchMedia === 'function' ? view.matchMedia(DARK_QUERY) : null;
  }

  private readStoredTheme(): Theme | null {
    try {
      const value = this.document.defaultView?.localStorage.getItem(THEME_STORAGE_KEY);
      return isTheme(value) ? value : null;
    } catch {
      return null; // Storage blocked (privacy mode, disabled cookies, etc.).
    }
  }

  private writeStoredTheme(theme: Theme): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      this.document.defaultView?.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore: the choice still applies for this visit.
    }
  }
}
