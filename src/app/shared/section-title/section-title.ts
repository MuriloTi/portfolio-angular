import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

/**
 * Section `<h2>`. `headingId` must match the section's `aria-labelledby`.
 */
@Component({
  selector: 'app-section-title',
  imports: [TranslocoPipe],
  template: `<h2 class="section-title" [id]="headingId()">{{ titleKey() | transloco }}</h2>`,
  styleUrl: './section-title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionTitle {
  readonly headingId = input.required<string>();
  readonly titleKey = input.required<string>();
}
