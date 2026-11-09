import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'sun'
  | 'moon'
  | 'menu'
  | 'close'
  | 'mail'
  | 'linkedin'
  | 'github'
  | 'download'
  | 'arrow-right'
  | 'map-pin'
  | 'lock'
  | 'chevron-left'
  | 'chevron-right'
  | 'maximize';

/**
 * Inline SVG icon. Decorative by default (`aria-hidden`): the accessible name must come from the
 * surrounding button/link. Stroke icons inherit `currentColor`.
 */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(20);
}
