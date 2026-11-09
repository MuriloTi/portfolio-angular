import { TestBed } from '@angular/core/testing';

import { LanguageService } from '../../core/language.service';
import { provideI18n } from '../../core/provide-i18n';
import { Skills } from './skills';

describe('Skills', () => {
  async function render(lang: 'pt-BR' | 'en-US') {
    localStorage.clear();
    TestBed.configureTestingModule({ imports: [Skills], providers: [provideI18n()] });
    await TestBed.inject(LanguageService).setLang(lang);
    const fixture = TestBed.createComponent(Skills);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  const chipTexts = (el: HTMLElement) =>
    Array.from(el.querySelectorAll('.chip')).map((chip) => chip.textContent?.trim());

  it('renders the eight groups with translated titles', async () => {
    const el = await render('pt-BR');
    const titles = Array.from(el.querySelectorAll('h3')).map((h) => h.textContent?.trim());
    expect(titles).toEqual([
      'Back end',
      'Front end',
      'Banco de dados',
      'Cloud & DevOps',
      'Mensageria',
      'Arquitetura',
      'Qualidade e processo',
      'Sistemas de negócio',
    ]);
    expect(el.querySelector('section')?.getAttribute('aria-labelledby')).toBe('skills-title');
  });

  it('translates only the chips marked as translatable', async () => {
    const pt = chipTexts(await render('pt-BR'));
    expect(pt).toContain('Relatórios');
    expect(pt).toContain('GCP (básico)');
    expect(pt).toContain('Entity Framework Core');

    TestBed.resetTestingModule();
    const en = chipTexts(await render('en-US'));
    expect(en).toContain('Reporting');
    expect(en).toContain('GCP (basic)');
    expect(en).toContain('Entity Framework Core');
  });
});
