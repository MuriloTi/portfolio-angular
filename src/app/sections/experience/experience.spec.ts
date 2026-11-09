import { TestBed } from '@angular/core/testing';

import { LanguageService } from '../../core/language.service';
import { provideI18n } from '../../core/provide-i18n';
import { Experience } from './experience';

describe('Experience', () => {
  let el: HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    TestBed.configureTestingModule({ imports: [Experience], providers: [provideI18n()] });
    await TestBed.inject(LanguageService).setLang('pt-BR');
    const fixture = TestBed.createComponent(Experience);
    await fixture.whenStable();
    el = fixture.nativeElement;
  });

  it('lists the jobs most recent first', () => {
    const companies = Array.from(el.querySelectorAll('.job__company')).map((p) =>
      p.textContent?.trim(),
    );
    expect(companies).toEqual(['Codecycle', 'Grupo Rivema', 'Hospital Presbiteriano Dr. Gordon']);
  });

  it('renders translated role, period, location and every bullet', () => {
    const [first] = Array.from(el.querySelectorAll('.job'));
    expect(first.querySelector('.job__period')?.textContent?.trim()).toBe('Out 2024 – Atual');
    expect(first.querySelector('.job__location')?.textContent?.trim()).toBe('Remoto');

    const bulletCounts = Array.from(el.querySelectorAll('.job__bullets')).map(
      (list) => list.children.length,
    );
    expect(bulletCounts).toEqual([4, 4, 3]);
  });
});
