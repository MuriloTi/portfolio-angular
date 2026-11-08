import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { Lang } from '../../core/i18n';
import { LanguageService } from '../../core/language.service';
import { ThemeService } from '../../core/theme.service';
import { NAV_ITEMS } from '../../data/navigation';
import { PROFILE } from '../../data/profile';
import { Icon } from '../../shared/icon/icon';

const DESKTOP_QUERY = '(min-width: 768px)';

@Component({
  selector: 'app-header',
  imports: [Icon, TranslocoPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class Header {
  protected readonly theme = inject(ThemeService);
  protected readonly language = inject(LanguageService);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly profile = PROFILE;
  protected readonly navItems = NAV_ITEMS;

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  /** Id of the section currently in view (null at the top / hero). */
  protected readonly activeSection = signal<string | null>(null);

  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');

  constructor() {
    afterNextRender(() => {
      this.trackScroll();
      this.trackActiveSection();
      this.closeMenuOnDesktop();
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected setLang(lang: Lang): void {
    void this.language.setLang(lang);
  }

  protected onEscape(): void {
    if (this.menuOpen()) {
      this.menuOpen.set(false);
      this.menuButton().nativeElement.focus();
    }
  }

  private trackScroll(): void {
    const view = this.document.defaultView;
    if (!view) {
      return;
    }
    const update = () => this.scrolled.set(view.scrollY > 8);
    update();
    view.addEventListener('scroll', update, { passive: true });
    this.destroyRef.onDestroy(() => view.removeEventListener('scroll', update));
  }

  /** Highlights the nav link of the section crossing the middle of the viewport. */
  private trackActiveSection(): void {
    const view = this.document.defaultView;
    if (!view || !('IntersectionObserver' in view)) {
      return;
    }
    const ids = ['top', ...this.navItems.map((item) => item.id)];
    const observer = new view.IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id === 'top' ? null : entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const id of ids) {
      const section = this.document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    }
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private closeMenuOnDesktop(): void {
    const media = this.document.defaultView?.matchMedia?.(DESKTOP_QUERY);
    if (!media) {
      return;
    }
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        this.menuOpen.set(false);
      }
    };
    media.addEventListener('change', onChange);
    this.destroyRef.onDestroy(() => media.removeEventListener('change', onChange));
  }
}
