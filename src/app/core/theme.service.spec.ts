import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { THEME_STORAGE_KEY, ThemeService } from './theme.service';

describe('ThemeService', () => {
  const root = document.documentElement;

  beforeEach(() => {
    localStorage.clear();
    root.removeAttribute('data-theme');
  });

  function create(platform: 'browser' | 'server' = 'browser'): ThemeService {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: platform }],
    });
    return TestBed.inject(ThemeService);
  }

  it('uses the theme already applied by the inline script', () => {
    root.setAttribute('data-theme', 'dark');
    const service = create();
    expect(service.theme()).toBe('dark');
    expect(service.isDark()).toBe(true);
  });

  it('falls back to the stored choice when no attribute is present', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    const service = create();
    expect(service.theme()).toBe('dark');
    expect(root.getAttribute('data-theme')).toBe('dark');
  });

  it('defaults to light without a stored choice or OS dark preference', () => {
    const service = create();
    expect(service.theme()).toBe('light');
  });

  it('toggle() switches the theme, updates <html> and saves the choice', () => {
    root.setAttribute('data-theme', 'light');
    const service = create();

    service.toggle();
    expect(service.theme()).toBe('dark');
    expect(root.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

    service.toggle();
    expect(service.theme()).toBe('light');
    expect(root.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('ignores invalid stored values', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'purple');
    const service = create();
    expect(service.theme()).toBe('light');
  });

  it('on the server defaults to light and does not touch storage', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    const service = create('server');
    expect(service.theme()).toBe('light');
    expect(root.hasAttribute('data-theme')).toBe(false);
  });
});
