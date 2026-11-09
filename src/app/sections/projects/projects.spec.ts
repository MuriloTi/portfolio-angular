import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageService } from '../../core/language.service';
import { provideI18n } from '../../core/provide-i18n';
import { Projects } from './projects';

describe('Projects (with lightbox)', () => {
  let fixture: ComponentFixture<Projects>;
  let el: HTMLElement;

  const thumbs = () => Array.from(el.querySelectorAll<HTMLButtonElement>('.gallery__thumb'));
  const dialog = () => el.querySelector('dialog') as HTMLDialogElement;
  const caption = () => el.querySelector('.lightbox__caption')?.textContent?.trim();
  const counter = () => el.querySelector('.lightbox__counter')?.textContent?.trim();
  const keydown = (key: string) =>
    dialog().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));

  beforeEach(async () => {
    localStorage.clear();
    TestBed.configureTestingModule({ imports: [Projects], providers: [provideI18n()] });
    await TestBed.inject(LanguageService).setLang('pt-BR');
    fixture = TestBed.createComponent(Projects);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('renders the Financial card with badges, highlights, stack and no repository link', () => {
    expect(el.querySelector('h3')?.textContent?.trim()).toBe('Financial');
    const badges = Array.from(el.querySelectorAll('.badge')).map((b) => b.textContent?.trim());
    expect(badges).toEqual(['Em produção', 'Código privado']);
    expect(el.querySelectorAll('.project__highlights li')).toHaveLength(7);
    expect(el.querySelectorAll('.chip')).toHaveLength(12);
    expect(el.querySelector('a[href*="github.com"]')).toBeNull();
    expect(el.querySelector('.project__note')?.textContent?.trim()).toBe(
      'Telas com dados fictícios de um ambiente de testes.',
    );
  });

  it('gives each thumbnail a translated label and alt', () => {
    const [first] = thumbs();
    expect(first.getAttribute('aria-label')).toBe(
      'Ampliar imagem: Contas a Receber: resumo por natureza, forma de pagamento e maiores clientes',
    );
    expect(first.querySelector('img')?.getAttribute('alt')).toContain('Contas a Receber');
  });

  it('opens on the clicked image and navigates with the arrow keys, wrapping around', async () => {
    expect(dialog().open).toBe(false);

    thumbs()[1].click();
    await fixture.whenStable();
    expect(dialog().open).toBe(true);
    expect(caption()).toContain('Vendas');
    expect(counter()).toBe('Imagem 2 de 2');

    keydown('ArrowRight');
    await fixture.whenStable();
    expect(caption()).toContain('Contas a Receber');
    expect(counter()).toBe('Imagem 1 de 2');

    keydown('ArrowLeft');
    await fixture.whenStable();
    expect(caption()).toContain('Vendas');
  });

  it('closes with the close button and returns focus to the thumbnail', async () => {
    const thumb = thumbs()[0];
    thumb.focus();
    thumb.click();
    await fixture.whenStable();

    el.querySelector<HTMLButtonElement>('.lightbox__close')?.click();
    await fixture.whenStable();

    expect(dialog().open).toBe(false);
    expect(el.querySelector('.lightbox__figure')).toBeNull();
    expect(document.activeElement).toBe(thumb);
  });

  it('closes when clicking outside the image', async () => {
    thumbs()[0].click();
    await fixture.whenStable();

    dialog().click();
    await fixture.whenStable();

    expect(dialog().open).toBe(false);
  });
});
