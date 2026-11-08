import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { ABOUT_HIGHLIGHTS, ABOUT_PARAGRAPH_KEYS } from '../../data/about';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { SectionTitle } from '../../shared/section-title/section-title';

@Component({
  selector: 'app-about',
  imports: [TranslocoPipe, SectionTitle, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly paragraphKeys = ABOUT_PARAGRAPH_KEYS;
  protected readonly highlights = ABOUT_HIGHLIGHTS;
}
