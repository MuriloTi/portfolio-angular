import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { SOCIAL_LINKS } from '../../data/profile';
import { Icon } from '../icon/icon';

/** Row of icon-only social links (LinkedIn, GitHub, e-mail). */
@Component({
  selector: 'app-social-links',
  imports: [Icon, TranslocoPipe],
  templateUrl: './social-links.html',
  styleUrl: './social-links.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinks {
  readonly iconSize = input(20);
  protected readonly links = SOCIAL_LINKS;
}
