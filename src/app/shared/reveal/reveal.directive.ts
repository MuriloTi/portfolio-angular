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
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const renderer = inject(Renderer2);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const view = element.ownerDocument.defaultView;
      if (!view || !('IntersectionObserver' in view)) {
        return;
      }
      if (element.getBoundingClientRect().top < view.innerHeight) {
        return; // Already visible: never hide it.
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
    });
  }
}
