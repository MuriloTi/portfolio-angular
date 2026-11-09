import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { TranslocoService } from '@jsverse/transloco';

import { LANG_STORAGE_KEY, langFromBrowser } from './i18n';
import { LanguageService } from './language.service';
import { provideI18n } from './provide-i18n';

describe('langFromBrowser', () => {
  it.each([
    ['pt-BR', 'pt-BR'],
    ['pt-PT', 'pt-BR'],
    ['pt', 'pt-BR'],
    ['en-US', 'en-US'],
    ['es-ES', 'en-US'],
    ['', 'en-US'],
    [undefined, 'en-US'],
  ])('%s → %s', (input, expected) => {
    expect(langFromBrowser(input)).toBe(expected);
  });
});

describe('LanguageService', () => {
  const root = document.documentElement;

  beforeEach(() => {
    localStorage.clear();
    root.lang = '';
  });

  function setup(platform: 'browser' | 'server' = 'browser') {
    TestBed.configureTestingModule({
      providers: [provideI18n(), { provide: PLATFORM_ID, useValue: platform }],
    });
    return {
      service: TestBed.inject(LanguageService),
      transloco: TestBed.inject(TranslocoService),
      title: TestBed.inject(Title),
      meta: TestBed.inject(Meta),
    };
  }

  it('uses the stored language over the browser language', async () => {
    localStorage.setItem(LANG_STORAGE_KEY, 'en-US');
    const { service, transloco } = setup();
    await service.init();
    expect(service.lang()).toBe('en-US');
    expect(transloco.getActiveLang()).toBe('en-US');
  });

  it('always starts in pt-BR on the server', async () => {
    localStorage.setItem(LANG_STORAGE_KEY, 'en-US');
    const { service } = setup('server');
    await service.init();
    expect(service.lang()).toBe('pt-BR');
  });

  it('setLang() updates <html lang>, title, description and saves the choice', async () => {
    const { service, title, meta } = setup();

    await service.setLang('pt-BR');
    expect(root.lang).toBe('pt-BR');
    expect(title.getTitle()).toBe('Murilo Barros Cardoso · Engenheiro de Software Full-Stack');
    expect(meta.getTag('name="description"')?.content).toContain('Desenvolvedor full-stack');

    await service.setLang('en-US');
    expect(service.lang()).toBe('en-US');
    expect(root.lang).toBe('en-US');
    expect(title.getTitle()).toBe('Murilo Barros Cardoso · Full-Stack Software Engineer');
    expect(meta.getTag('name="description"')?.content).toContain('Full-stack developer');
    expect(localStorage.getItem(LANG_STORAGE_KEY)).toBe('en-US');
  });

  it('keeps Open Graph and Twitter tags in the active language', async () => {
    const { service, meta } = setup();

    await service.setLang('en-US');
    expect(meta.getTag('property="og:title"')?.content).toBe(
      'Murilo Barros Cardoso · Full-Stack Software Engineer',
    );
    expect(meta.getTag('property="og:description"')?.content).toContain('Full-stack developer');
    expect(meta.getTag('property="og:locale"')?.content).toBe('en_US');
    expect(meta.getTag('property="og:locale:alternate"')?.content).toBe('pt_BR');
    expect(meta.getTag('name="twitter:title"')?.content).toContain('Full-Stack Software Engineer');

    await service.setLang('pt-BR');
    expect(meta.getTag('property="og:locale"')?.content).toBe('pt_BR');
    expect(meta.getTag('property="og:image:alt"')?.content).toBe('Foto de Murilo Barros Cardoso');
  });
});
