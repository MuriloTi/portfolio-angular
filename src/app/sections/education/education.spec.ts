import { TestBed } from '@angular/core/testing';

import { LanguageService } from '../../core/language.service';
import { provideI18n } from '../../core/provide-i18n';
import { Education } from './education';

describe('Education', () => {
  let el: HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    TestBed.configureTestingModule({ imports: [Education], providers: [provideI18n()] });
    await TestBed.inject(LanguageService).setLang('en-US');
    const fixture = TestBed.createComponent(Education);
    await fixture.whenStable();
    el = fixture.nativeElement;
  });

  it('renders the three degrees with institution and translated period', () => {
    const degrees = Array.from(el.querySelectorAll('.degree'));
    expect(degrees.map((d) => d.querySelector('.degree__title')?.textContent?.trim())).toEqual([
      'Postgraduate Degree in .NET Software Architecture',
      'ASP.NET Core & .NET Expert Program',
      'B.S. in Information Systems',
    ]);
    expect(degrees[2].querySelector('.degree__institution')?.textContent?.trim()).toBe(
      'Universidade Estadual de Goiás (UEG) · Santa Helena de Goiás',
    );
    expect(degrees[2].querySelector('.degree__period')?.textContent?.trim()).toBe(
      'Jan 2011 – Feb 2015',
    );
  });

  it('shows details only for the Expert program', () => {
    expect(el.querySelectorAll('.degree__details')).toHaveLength(1);
    expect(el.querySelector('.degree__details')?.textContent).toContain('API development');
  });

  it('lists the spoken languages', () => {
    const items = Array.from(el.querySelectorAll('.languages__list li')).map((li) =>
      li.textContent?.trim(),
    );
    expect(items).toEqual(['Portuguese — Native', 'English — Advanced']);
  });
});
