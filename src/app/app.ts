import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { About } from './sections/about/about';
import { Education } from './sections/education/education';
import { Experience } from './sections/experience/experience';
import { Header } from './sections/header/header';
import { Hero } from './sections/hero/hero';
import { Skills } from './sections/skills/skills';

@Component({
  selector: 'app-root',
  imports: [TranslocoPipe, Header, Hero, About, Skills, Experience, Education],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
