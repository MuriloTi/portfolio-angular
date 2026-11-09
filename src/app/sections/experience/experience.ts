import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { EXPERIENCES } from '../../data/experience';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { SectionTitle } from '../../shared/section-title/section-title';

@Component({
  selector: 'app-experience',
  imports: [TranslocoPipe, SectionTitle, RevealDirective, Icon],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly experiences = EXPERIENCES;
}
