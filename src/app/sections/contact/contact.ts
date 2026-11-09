import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { SOCIAL_LINKS } from '../../data/profile';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [TranslocoPipe, Icon, RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  /** E-mail first (primary call to action), then LinkedIn and GitHub. */
  protected readonly links = [...SOCIAL_LINKS].sort(
    (a, b) => Number(b.id === 'email') - Number(a.id === 'email'),
  );
}
