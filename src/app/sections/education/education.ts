import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { EDUCATION, LANGUAGE_KEYS } from '../../data/education';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { SectionTitle } from '../../shared/section-title/section-title';

@Component({
  selector: 'app-education',
  imports: [TranslocoPipe, SectionTitle, RevealDirective],
  templateUrl: './education.html',
  styleUrl: './education.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Education {
  protected readonly education = EDUCATION;
  protected readonly languageKeys = LANGUAGE_KEYS;
}
