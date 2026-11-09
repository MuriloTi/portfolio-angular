import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Renderer2,
} from '@angular/core';

/**
 * Subtle fade/slide-in when the element scrolls into view.
 *
 * Runs only in the browser after render, so prerendered content is always visible without JS.
 * Elements already in the viewport are shown immediately; motion is skipped entirely with
 * `prefers-reduced-motion` (see `.reveal` in `_utilities.scss`).
 *
 * Performance: measuring uses the `earlyRead` phase and class changes the `write` phase. Angular
 * runs every directive's reads before any writes, so the page is laid out once instead of once
 * per element (no forced reflows).
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const renderer = inject(Renderer2);
    const destroyRef = inject(DestroyRef);

    afterNextRender({
      earlyRead: () => {
        const view = element.ownerDocument.defaultView;
        if (!view || !('IntersectionObserver' in view)) {
          return false;
        }
        // Already visible: never hide it.
        return element.getBoundingClientRect().top >= view.innerHeight;
      },
      write: (shouldReveal) => {
        const view = element.ownerDocument.defaultView;
        if (!shouldReveal || !view) {
          return;
        }
        renderer.addClass(element, 'reveal');
        const observer = new view.IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              renderer.addClass(element, 'reveal--visible');
              observer.disconnect();
            }
          },
          { rootMargin: '0px 0px -10% 0px' },
        );
        observer.observe(element);
        destroyRef.onDestroy(() => observer.disconnect());
      },
    });
  }
}
