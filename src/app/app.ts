import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { About } from './sections/about/about';
import { Header } from './sections/header/header';
import { Hero } from './sections/hero/hero';

@Component({
  selector: 'app-root',
  imports: [TranslocoPipe, Header, Hero, About],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
