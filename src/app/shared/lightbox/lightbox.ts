import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { Icon } from '../icon/icon';

export interface GalleryImage {
  /** Relative path (no leading slash) so it works with the GitHub Pages base-href. */
  src: string;
  width: number;
  height: number;
  /** i18n key used for both the caption and the `alt` text. */
  captionKey: string;
}

/**
 * Accessible image viewer built on the native modal `<dialog>`:
 * the rest of the page becomes inert (focus stays inside), Esc closes it (native `cancel`),
 * a click outside the image closes it, ← / → navigate, and focus returns to the opener.
 */
@Component({
  selector: 'app-lightbox',
  imports: [NgOptimizedImage, TranslocoPipe, Icon],
  templateUrl: './lightbox.html',
  styleUrl: './lightbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Events from the <dialog> bubble here; the host only has content while the dialog is open.
  host: {
    '(click)': 'onDialogClick($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class Lightbox {
  readonly images = input.required<readonly GalleryImage[]>();

  /** Index of the image on screen, or null while closed. */
  protected readonly index = signal<number | null>(null);
  protected readonly total = computed(() => this.images().length);

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly document = inject(DOCUMENT);
  private opener: HTMLElement | null = null;

  open(index: number): void {
    const active = this.document.activeElement;
    this.opener = active instanceof HTMLElement ? active : null;
    this.index.set(this.wrap(index));

    const dialog = this.dialog().nativeElement;
    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', ''); // Environments without <dialog> support (e.g. jsdom).
      }
    }
  }

  close(): void {
    const dialog = this.dialog().nativeElement;
    if (typeof dialog.close === 'function') {
      dialog.close(); // Fires `close`, handled by onClosed().
    } else {
      dialog.removeAttribute('open');
      this.onClosed();
    }
  }

  protected previous(): void {
    this.index.update((i) => this.wrap((i ?? 0) - 1));
  }

  protected next(): void {
    this.index.update((i) => this.wrap((i ?? 0) + 1));
  }

  /** Runs for every way of closing: button, Esc, outside click. */
  protected onClosed(): void {
    this.index.set(null);
    this.opener?.focus();
    this.opener = null;
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.index() === null) {
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previous();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    }
  }

  /** Clicks on the backdrop or on empty space around the image close the viewer. */
  protected onDialogClick(event: MouseEvent): void {
    const target = event.target as Element | null;
    if (
      this.index() !== null &&
      !target?.closest('.lightbox__figure, .lightbox__counter, button')
    ) {
      this.close();
    }
  }

  private wrap(index: number): number {
    const total = this.total();
    return total === 0 ? 0 : ((index % total) + total) % total;
  }
}
