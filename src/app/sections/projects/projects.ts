import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { PROJECTS } from '../../data/projects';
import { Icon } from '../../shared/icon/icon';
import { Lightbox } from '../../shared/lightbox/lightbox';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { SectionTitle } from '../../shared/section-title/section-title';

@Component({
  selector: 'app-projects',
  imports: [NgOptimizedImage, TranslocoPipe, SectionTitle, RevealDirective, Icon, Lightbox],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly projects = PROJECTS;
}
