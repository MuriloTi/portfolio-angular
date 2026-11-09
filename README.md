# Portfólio — Murilo Barros Cardoso

Portfólio pessoal de página única, bilíngue (PT-BR / EN-US), com tema claro e escuro, gerado como site estático e publicado no GitHub Pages.

**Site:** https://muriloti.github.io/portfolio-angular/

_Personal single-page portfolio, bilingual (PT-BR / EN-US), with light and dark themes, prerendered as a static site and deployed to GitHub Pages._

## Stack

- **Angular 22**: standalone components, signals, `@if`/`@for`, `OnPush` em todos os componentes
- **SSG** com `@angular/ssr` (`outputMode: "static"`): HTML pré-renderizado, sem servidor Node em produção
- **Transloco** para i18n, com traduções carregadas via `import()` dinâmico
- **SCSS** próprio com CSS custom properties (sem bibliotecas de UI) e ícones SVG inline
- `NgOptimizedImage`, lightbox acessível com `<dialog>` nativo, animações que respeitam `prefers-reduced-motion`
- **Qualidade:** ESLint (`angular-eslint`), Prettier e testes com Vitest
- **Deploy:** GitHub Actions → GitHub Pages

## Rodando localmente

Requisitos: **Node.js ≥ 24.15** e npm.

```bash
npm install
npm start
```

Abra `http://localhost:4200/`.

| Comando                                        | O que faz                              |
| ---------------------------------------------- | -------------------------------------- |
| `npm start`                                    | Servidor de desenvolvimento            |
| `npm run build`                                | Build de produção com pré-renderização |
| `npm test`                                     | Testes unitários (Vitest)              |
| `npm run lint`                                 | ESLint                                 |
| `npm run format`                               | Formata o código com Prettier          |
| `npx ng build --base-href /portfolio-angular/` | Build igual ao do deploy               |

A saída estática fica em `dist/portfolio-angular/browser`.

## Estrutura

```
public/            imagens e CV (referenciados com caminhos relativos)
src/i18n/          traduções pt-BR.json e en-US.json
src/app/core/      serviços de tema e idioma, configuração do Transloco
src/app/data/      conteúdo estruturado (perfil, skills, experiência, projetos, formação)
src/app/sections/  seções da página (header, hero, sobre, skills, ...)
src/app/shared/    componentes reutilizáveis (ícone, título de seção, lightbox, ...)
src/styles/        tokens de tema, base, mixins e utilitários
```

Para adicionar um projeto, inclua uma entrada em `src/app/data/projects.ts` e as chaves `projects.<id>.*` nos dois arquivos de tradução.

## Deploy

Cada push na branch `master` (ou uma execução manual) roda o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): instala as dependências, roda lint e testes, gera o build com `--base-href /portfolio-angular/` e publica no GitHub Pages.
