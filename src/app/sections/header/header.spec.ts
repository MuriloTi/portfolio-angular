import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageService } from '../../core/language.service';
import { provideI18n } from '../../core/provide-i18n';
import { Header } from './header';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;
  let el: HTMLElement;

  const query = <T extends Element>(selector: string) => el.querySelector(selector) as T;
  const menuButton = () => query<HTMLButtonElement>('.menu-toggle');
  const nav = () => query<HTMLElement>('#primary-nav');

  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.setAttribute('data-theme', 'light');
    TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideI18n()],
    });
    await TestBed.inject(LanguageService).setLang('pt-BR');
    fixture = TestBed.createComponent(Header);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('renders the five section links with translated labels', () => {
    const links = Array.from(el.querySelectorAll<HTMLAnchorElement>('.nav__link'));
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      '#about',
      '#skills',
      '#experience',
      '#projects',
      '#contact',
    ]);
    expect(links.map((a) => a.textContent?.trim())).toEqual([
      'Sobre',
      'Skills',
      'Experiência',
      'Projetos',
      'Contato',
    ]);
  });

  it('opens and closes the mobile menu with the button', async () => {
    expect(menuButton().getAttribute('aria-expanded')).toBe('false');
    expect(menuButton().getAttribute('aria-controls')).toBe('primary-nav');

    menuButton().click();
    await fixture.whenStable();
    expect(menuButton().getAttribute('aria-expanded')).toBe('true');
    expect(menuButton().getAttribute('aria-label')).toBe('Fechar menu');
    expect(nav().classList).toContain('nav--open');

    menuButton().click();
    await fixture.whenStable();
    expect(nav().classList).not.toContain('nav--open');
  });

  it('closes the menu with Escape and returns focus to the button', async () => {
    menuButton().click();
    await fixture.whenStable();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();

    expect(menuButton().getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(menuButton());
  });

  it('closes the menu when a link is clicked', async () => {
    menuButton().click();
    await fixture.whenStable();

    query<HTMLAnchorElement>('.nav__link').click();
    await fixture.whenStable();

    expect(nav().classList).not.toContain('nav--open');
  });

  it('switches language and reflects it with aria-pressed', async () => {
    const [pt, en] = Array.from(el.querySelectorAll<HTMLButtonElement>('.lang__option'));
    expect(pt.getAttribute('aria-pressed')).toBe('true');
    expect(en.getAttribute('aria-pressed')).toBe('false');

    en.click();
    await vi.waitFor(() => expect(document.documentElement.lang).toBe('en-US'));
    await fixture.whenStable();

    expect(pt.getAttribute('aria-pressed')).toBe('false');
    expect(en.getAttribute('aria-pressed')).toBe('true');
    expect(query('.nav__link').textContent?.trim()).toBe('About');
  });

  it('toggles the theme and updates the translated aria-label', async () => {
    const button = query<HTMLButtonElement>('.theme-toggle');
    expect(button.getAttribute('aria-label')).toBe('Ativar tema escuro');

    button.click();
    await fixture.whenStable();

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(button.getAttribute('aria-label')).toBe('Ativar tema claro');
  });
});
