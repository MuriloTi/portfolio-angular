import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { SocialLinks } from '../../shared/social-links/social-links';

@Component({
  selector: 'app-footer',
  imports: [TranslocoPipe, SocialLinks],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly year = new Date().getFullYear();
}
