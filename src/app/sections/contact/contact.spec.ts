import { TestBed } from '@angular/core/testing';

import { LanguageService } from '../../core/language.service';
import { provideI18n } from '../../core/provide-i18n';
import { Footer } from '../footer/footer';
import { Contact } from './contact';

describe('Contact and Footer', () => {
  beforeEach(async () => {
    localStorage.clear();
    TestBed.configureTestingModule({ imports: [Contact, Footer], providers: [provideI18n()] });
    await TestBed.inject(LanguageService).setLang('en-US');
  });

  it('shows e-mail, LinkedIn and GitHub links and no phone number', async () => {
    const fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('h2')?.textContent?.trim()).toBe("Let's talk");
    const links = Array.from(el.querySelectorAll('a'));
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      'mailto:murilo.ti.7@gmail.com',
      'https://www.linkedin.com/in/murilo-barros-cardoso-055b58102',
      'https://github.com/MuriloTi',
    ]);
    expect(links[0].textContent?.trim()).toBe('murilo.ti.7@gmail.com');
    expect(links[1].getAttribute('target')).toBe('_blank');
    expect(links[1].getAttribute('aria-label')).toBe('LinkedIn (opens in a new tab)');
    expect(el.querySelector('a[href^="tel:"]')).toBeNull();
  });

  it('renders the footer with the current year', async () => {
    const fixture = TestBed.createComponent(Footer);
    await fixture.whenStable();
    const text = (fixture.nativeElement as HTMLElement).querySelector('.footer__text')?.textContent;

    expect(text).toContain(`© ${new Date().getFullYear()} Murilo Barros Cardoso`);
    expect(text).toContain('Built with Angular');
  });
});
