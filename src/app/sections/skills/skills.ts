import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { SKILL_GROUPS } from '../../data/skills';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { SectionTitle } from '../../shared/section-title/section-title';

@Component({
  selector: 'app-skills',
  imports: [TranslocoPipe, SectionTitle, RevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
}
