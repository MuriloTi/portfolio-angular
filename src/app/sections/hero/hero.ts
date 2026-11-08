import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { PROFILE } from '../../data/profile';
import { Icon } from '../../shared/icon/icon';
import { SocialLinks } from '../../shared/social-links/social-links';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, TranslocoPipe, Icon, SocialLinks],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly profile = PROFILE;
}
