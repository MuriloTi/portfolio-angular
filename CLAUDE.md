# Portfólio — Murilo Barros Cardoso

Especificação do portfólio pessoal (landing page de página única). Este arquivo é a fonte de verdade do projeto: siga-o ao implementar e mantenha-o atualizado se alguma decisão mudar.

## Fluxo de trabalho

1. Antes de escrever código, leia este arquivo inteiro e apresente um plano curto das fases. Aguarde aprovação.
2. Implemente em fases. Ao fim de cada fase, pare e **sugira** uma mensagem de commit (em inglês, no padrão Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`) para o Murilo commitar.
3. Ao fim de cada fase, rode `ng build` e confirme que não há erros nem warnings novos.
4. Não invente informações sobre o Murilo. Todo o conteúdo está na seção **Conteúdo** abaixo; se faltar algo, pergunte.

### Regras obrigatórias

- **Git:** nunca faça commit, push, merge, rebase, criação/troca de branch, tags, pull requests ou qualquer outra operação que altere o histórico ou o repositório remoto. O Murilo faz isso pessoalmente. Comandos somente leitura (`git status`, `git diff`, `git log`) são permitidos.
- **Banco de dados:** nunca execute consultas ou conexões a bancos de dados, mesmo que encontre uma connection string no código ou em arquivos de configuração.

Fases sugeridas:

1. Scaffold, configuração de SSG, ESLint/Prettier, estrutura de pastas
2. Sistema de tema (light/dark) e tokens de design
3. i18n com Transloco (PT-BR / EN-US)
4. Header, Hero, Sobre
5. Skills, Experiência, Formação
6. Projetos (com galeria/lightbox), Contato, Footer
7. SEO, acessibilidade, performance
8. Deploy no GitHub Pages via GitHub Actions

## Repositório e ambiente

- Repositório: https://github.com/MuriloTi/portfolio-angular (público)
- Pasta local: `C:\Projects\portfolio-angular` (Windows)
- URL final: `https://muriloti.github.io/portfolio-angular/`
- A pasta **já contém** este `CLAUDE.md`, a pasta `public/` com imagens e o CV, e possivelmente `README.md`, `LICENSE` e `.git`. Ao gerar o projeto Angular, **não sobrescreva nem apague esses arquivos** (por exemplo, gere o projeto numa pasta temporária e mova os arquivos para cá, mesclando com o que já existe).

## Stack

- **Angular na versão estável mais recente** (verifique com `npm view @angular/cli version` antes de criar o projeto e use a sintaxe atual do CLI).
- Standalone components, **signals**, nova sintaxe de controle de fluxo (`@if`, `@for`), `ChangeDetectionStrategy.OnPush` em todos os componentes.
- **SCSS**, sem Angular Material, Bootstrap ou Tailwind. CSS próprio com variáveis.
- **SSG / pré-renderização** com `@angular/ssr` (saída estática, sem servidor Node em produção). Rota única `/`.
- **Transloco** (`@jsverse/transloco`) para i18n.
- Ícones como SVG inline (componente de ícone próprio ou SVGs simples). Não use bibliotecas de ícones pesadas.
- Fonte: **Inter** (Google Fonts) para texto; **JetBrains Mono** para pequenos detalhes técnicos (badges, rótulos).
- Imagens com `NgOptimizedImage` (sempre com `width`/`height`; `priority` apenas na foto do Hero).

**Decisões da Fase 1:** Angular 22.2 / TypeScript 6.0 (exige Node ≥ 24.15). `outputMode: "static"` no `angular.json`, sem Express/`server.ts`. Saída do browser em `dist/portfolio-angular/browser`. ESLint (`angular-eslint`) + Prettier (`eslint-config-prettier`), com regras que exigem OnPush, signals, `@if`/`@for` e `ngSrc`. Estilos globais importáveis como `@use 'styles/mixins'` (`includePaths: ["src"]`). Scripts: `npm run lint`, `npm run format`, `npm test`.

**Decisões da Fase 2:** além dos tokens da tabela de tema, `_tokens.scss` define `--success`/`--success-bg` (selo "Em produção"), `--shadow-sm`/`--shadow-md` (`none` no dark), `--header-bg`, `--hero-gradient`, `--focus-ring` e raios. Sem JS, o tema segue `prefers-color-scheme` via media query. O `ThemeService` também acompanha mudanças do SO ao vivo enquanto não houver escolha salva. Use o mixin `theme-transition` nos componentes com cor de fundo/borda própria.

### Cuidados com SSG

- Qualquer acesso a `window`, `document`, `localStorage` ou `matchMedia` deve ser protegido (`isPlatformBrowser`, `afterNextRender` ou injeção de `DOCUMENT`), para não quebrar a pré-renderização.
- Carregue as traduções sem HTTP, com um **loader do Transloco baseado em `import()` dinâmico** dos JSONs (ex.: `import(\`../i18n/${lang}.json\`)`). Isso funciona igual no build/prerender e no browser e evita problemas com o `base-href`.

## Estrutura de pastas

```
public/
  images/
    profile.jpeg
    projects/
      financial-contas-a-receber.png
      financial-vendas.png
  cv/
    Murilo-Barros-Cardoso-CV.pdf
src/
  i18n/
    pt-BR.json
    en-US.json
  app/
    core/            # serviços: theme.service.ts, language.service.ts, transloco loader
    shared/          # componentes reutilizáveis: icon, section-title, badge, lightbox
    sections/        # header, hero, about, skills, experience, projects, education, contact, footer
    data/            # dados estruturados (projetos, experiências, skills) que referenciam chaves i18n
  styles/
    _tokens.scss     # variáveis de tema
    _base.scss
    _mixins.scss
```

Os arquivos de `public/` já foram colocados pelo Murilo. Referencie-os com caminhos **relativos** (`images/profile.jpeg`, `cv/...`), nunca começando com `/`, para funcionar com o `base-href` `/portfolio-angular/`.

## Tema (light / dark)

Tokens em CSS custom properties no `:root` e em `[data-theme="dark"]` no elemento `<html>`.

| Token                               | Light     | Dark      |
| ----------------------------------- | --------- | --------- |
| `--bg`                              | `#FAF8FF` | `#0F0B1A` |
| `--surface` (cards)                 | `#FFFFFF` | `#1A1428` |
| `--surface-2` (hover/realce)        | `#F3EEFF` | `#241B38` |
| `--border`                          | `#E6DEFA` | `#2E2445` |
| `--primary`                         | `#6D28D9` | `#A78BFA` |
| `--primary-hover`                   | `#5B21B6` | `#C4B5FD` |
| `--on-primary` (texto sobre o roxo) | `#FFFFFF` | `#0F0B1A` |
| `--text`                            | `#1E1B2E` | `#EDE9FE` |
| `--text-muted`                      | `#5B5570` | `#A39DB8` |

Regras:

- Na primeira visita, o tema segue `prefers-color-scheme`. Depois que o visitante clica no botão, a escolha fica salva em `localStorage` (chave `theme`) e passa a valer.
- **Sem flash de tema errado:** um script inline pequeno no `<head>` do `index.html` lê `localStorage`/`prefers-color-scheme` e aplica `data-theme` antes de o Angular carregar.
- `ThemeService` com um signal `theme` e o método `toggle()`.
- Botão no header com ícone de sol/lua, `aria-label` traduzido ("Ativar tema escuro" / "Switch to dark theme" etc.).
- Transição suave de cores (`transition` em `background-color`/`color`, ~200 ms), desativada com `prefers-reduced-motion`.
- Contraste mínimo WCAG AA em ambos os temas.
- Estilo geral: limpo e moderno, cantos arredondados (~12–16 px), sombras sutis no light, bordas sutis no dark. Um gradiente roxo discreto pode aparecer no fundo do Hero.

## Idiomas (Transloco)

- Idiomas disponíveis: `pt-BR` e `en-US`. Fallback: `en-US`.
- Idioma inicial: escolha salva em `localStorage` (chave `lang`) → senão, idioma do navegador (`pt*` → `pt-BR`; qualquer outro → `en-US`).
- O HTML pré-renderizado sai em `pt-BR`; no browser, troque para o idioma correto na inicialização.
- Seletor no header: `PT | EN`, com o idioma ativo destacado e `aria-pressed`.
- Ao trocar o idioma, atualize: `<html lang>`, `<title>` e `<meta name="description">` (use `Title` e `Meta` do Angular).
- **Todo** texto visível vem do JSON, inclusive `aria-labels`, `alt` de imagens e legendas da galeria. Nomes de tecnologias não são traduzidos.
- `LanguageService` com signal `lang` e `setLang()`.

## Seções e layout

Página única, rolagem suave entre âncoras (`scroll-margin-top` para compensar o header fixo). Layout responsivo, mobile-first; largura máxima do conteúdo ~1120 px.

1. **Header fixo** — logo/nome "Murilo Cardoso" (ou monograma "MB"), links: Sobre, Skills, Experiência, Projetos, Contato. À direita: seletor PT | EN e botão de tema. No mobile, menu hambúrguer acessível (fecha com Esc e ao clicar num link). Fundo com leve blur e borda inferior ao rolar. Destaque do link da seção visível (IntersectionObserver, só no browser).
2. **Hero** — foto (`images/profile.jpeg`) recortada em círculo ou cantos arredondados, com borda/anel roxo. A foto original é horizontal (1280×960) com o rosto à esquerda do centro: use `object-fit: cover` e `object-position` em torno de `35% 25%` para centralizar o rosto; ajuste visualmente. Nome, título, tagline, localização ("Rio Verde, Brasil · Disponível para trabalho remoto"). Botões: "Ver projetos" (primário, âncora para #projects), "Baixar CV" (secundário, `cv/Murilo-Barros-Cardoso-CV.pdf` com atributo `download`), e ícones de LinkedIn, GitHub e e-mail.
3. **Sobre** (`#about`) — texto de resumo + 4 cards de destaques numéricos.
4. **Skills** (`#skills`) — cards por grupo, cada um com chips das tecnologias.
5. **Experiência** (`#experience`) — timeline vertical (linha e marcadores roxos), mais recente primeiro.
6. **Projetos** (`#projects`) — card de destaque do Financial (detalhes abaixo). Os projetos vêm de um array em `data/`, para que novos projetos sejam adicionados só com dados + chaves i18n.
7. **Formação** (`#education`) — lista/cards.
8. **Contato** (`#contact`) — frase convidativa e três links: e-mail (`mailto:`), LinkedIn, GitHub. **Não exibir telefone.**
9. **Footer** — "© {ano} Murilo Barros Cardoso" + "Feito com Angular" + links sociais.

Animações: entrada suave das seções ao rolar (fade/slide curto), respeitando `prefers-reduced-motion`. Nada chamativo.

### Card do projeto Financial

- Título "Financial", subtítulo traduzido, período "Jan 2023 – presente".
- Selos: "Em produção" (verde/roxo) e "Código privado" (com ícone de cadeado). **Sem link para repositório.**
- Badges de stack: .NET 10, C#, Angular 18, SQL Server, EF Core, MediatR, CQRS, Clean Architecture, Azure Functions, Azure Blob Storage, JWT, QuestPDF.
- Descrição + lista de destaques (ver conteúdo).
- Galeria com as duas imagens (miniaturas clicáveis). Ao clicar, abre um **lightbox** acessível: foco preso no modal, fecha com Esc e clique fora, setas ← → para navegar, legenda traduzida, `alt` traduzido.
- Nota pequena abaixo da galeria: "Telas com dados fictícios de um ambiente de testes."

## SEO, acessibilidade e performance

- `<title>` e `meta description` por idioma; Open Graph (`og:title`, `og:description`, `og:image` usando a foto ou um banner, `og:url`) e Twitter Card.
- `favicon` simples com o monograma "MB" em roxo (SVG).
- HTML semântico (`header`, `nav`, `main`, `section` com `aria-labelledby`, `footer`), um único `h1` (o nome no Hero).
- Navegação completa por teclado, foco visível estilizado em roxo, link "Pular para o conteúdo".
- Meta: Lighthouse ≥ 90 em Performance, Acessibilidade, Boas práticas e SEO.

## Deploy (GitHub Pages)

- Workflow `.github/workflows/deploy.yml`: dispara em push na `master` e manualmente (`workflow_dispatch`). Etapas: checkout → setup Node (LTS) com cache npm → `npm ci` → build de produção com `--base-href /portfolio-angular/` → upload do diretório de saída do browser (ex.: `dist/portfolio-angular/browser`, confirme o caminho real) com `actions/upload-pages-artifact` → `actions/deploy-pages`.
- Permissões do workflow: `pages: write`, `id-token: write`, `contents: read`.
- Ao final, avise o Murilo para ativar em **Settings → Pages → Source: GitHub Actions**.
- Atualize o `README.md` com descrição curta, stack, como rodar localmente e link do site.

---

## Conteúdo

### Dados gerais

- Nome: **Murilo Barros Cardoso**
- E-mail: murilo.ti.7@gmail.com
- LinkedIn: https://www.linkedin.com/in/murilo-barros-cardoso-055b58102
- GitHub: https://github.com/MuriloTi
- Telefone: **não exibir**

### Meta / SEO

| Chave       | PT-BR                                                                                                                     | EN-US                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| title       | Murilo Barros Cardoso · Engenheiro de Software Full-Stack                                                                 | Murilo Barros Cardoso · Full-Stack Software Engineer                                                                               |
| description | Desenvolvedor full-stack com 5+ anos em C#/.NET, Angular, SQL Server e Azure. Pipelines de alto volume e ERP em produção. | Full-stack developer with 5+ years in C#/.NET, Angular, SQL Server and Azure. High-volume data pipelines and an ERP in production. |

### Navegação

| PT-BR       | EN-US      |
| ----------- | ---------- |
| Sobre       | About      |
| Skills      | Skills     |
| Experiência | Experience |
| Projetos    | Projects   |
| Formação    | Education  |
| Contato     | Contact    |

### Hero

| Item        | PT-BR                                                                                                                          | EN-US                                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Saudação    | Olá, eu sou                                                                                                                    | Hi, I'm                                                                                                                                   |
| Título      | Engenheiro de Software Full-Stack                                                                                              | Full-Stack Software Engineer                                                                                                              |
| Stack       | .NET / C# • Angular • SQL Server • Azure                                                                                       | .NET / C# • Angular • SQL Server • Azure                                                                                                  |
| Tagline     | Construo sistemas confiáveis com .NET e Angular, de pipelines que processam dezenas de milhões de linhas a um ERP em produção. | I build reliable systems with .NET and Angular, from data pipelines processing tens of millions of lines to an ERP running in production. |
| Localização | Rio Verde, Brasil (UTC-3) · Disponível para trabalho remoto                                                                    | Rio Verde, Brazil (UTC-3) · Open to remote work                                                                                           |
| Botão 1     | Ver projetos                                                                                                                   | View projects                                                                                                                             |
| Botão 2     | Baixar CV (EN)                                                                                                                 | Download CV                                                                                                                               |
| Alt da foto | Foto de Murilo Barros Cardoso                                                                                                  | Photo of Murilo Barros Cardoso                                                                                                            |

### Sobre

**PT-BR**

> Sou desenvolvedor full-stack com mais de 5 anos de experiência criando aplicações web e APIs REST com C#/.NET e Angular. Acompanhei toda a evolução do .NET, do .NET Core 3.1 ao .NET 10, aplicando Clean Architecture, CQRS e princípios SOLID.
>
> Construo pipelines de dados de alto volume, que processam arquivos de até 50 milhões de linhas, e entrego produtos full-stack em produção. Tenho base sólida em SQL Server, de stored procedures a relatórios, além de experiência prática com Azure, mensageria (RabbitMQ, Azure Service Bus), Docker e CI/CD.
>
> Sou pós-graduado em Arquitetura de Software .NET. Meus anos de experiência com o ERP TOTVS Protheus nas áreas financeira, de faturamento e de estoque me ajudam a transformar regras de negócio em software confiável.

**EN-US**

> I'm a full-stack developer with 5+ years of experience building web applications and REST APIs with C#/.NET and Angular. I've worked across the full .NET evolution, from .NET Core 3.1 to .NET 10, applying Clean Architecture, CQRS and SOLID principles.
>
> I build high-volume data pipelines that process files of up to 50 million lines, and I ship full-stack products to production. I have a strong SQL Server background, from stored procedures to reporting, plus hands-on work with Azure, messaging (RabbitMQ, Azure Service Bus), Docker and CI/CD.
>
> I hold a postgraduate degree in .NET Software Architecture. Years of ERP experience (TOTVS Protheus) in finance, billing and inventory help me translate business rules into reliable software.

**Destaques (cards numéricos)**

| Número | PT-BR                                    | EN-US                            |
| ------ | ---------------------------------------- | -------------------------------- |
| 5+     | anos com C#/.NET e Angular               | years with C#/.NET and Angular   |
| 50M    | linhas por arquivo em pipelines de dados | lines per file in data pipelines |
| ~50    | arquivos processados por dia             | files processed per day          |
| 1      | ERP próprio em produção                  | own ERP in production            |

### Skills

Títulos dos grupos (PT-BR / EN-US) e chips (não traduzir):

- **Back end / Back end:** C#, .NET (Core 3.1 → .NET 10), ASP.NET Core, ASP.NET MVC, Entity Framework Core, MediatR, REST APIs
- **Front end / Front end:** Angular (15+), AngularJS, TypeScript, JavaScript, HTML, CSS, Bootstrap, Angular Material
- **Banco de dados / Databases:** SQL Server, T-SQL, Stored Procedures, Relatórios / Reporting (traduzir só esse chip)
- **Cloud & DevOps / Cloud & DevOps:** Azure Functions, Azure Blob Storage, GCP (básico / basic), Docker, CI/CD
- **Mensageria / Messaging:** RabbitMQ, Azure Service Bus
- **Arquitetura / Architecture:** Clean Architecture, Hexagonal, Modular Monolith, Microservices, CQRS, Repository, Unit of Work, SOLID
- **Qualidade e processo / Quality & Process:** Testes unitários / Unit testing, TDD, Cache e resiliência / Caching & resilience, Agile / Scrum
- **Sistemas de negócio / Business systems:** TOTVS Protheus (Contabilidade, Ativo Fixo, Compras, Estoque, Faturamento, Financeiro / Accounting, Fixed Assets, Purchasing, Inventory, Billing, Finance), DMS

### Experiência (mais recente primeiro)

**1. Codecycle** — Full-Stack Developer · Remoto / Remote · Out 2024 – Atual / Oct 2024 – Present

PT-BR:

- Desenvolvo aplicações web e APIs REST com C#/.NET no back end e AngularJS no front end.
- Construo e mantenho um pipeline de aplicações console .NET que processa cerca de 50 arquivos TXT/CSV por dia, cada um com 2 a 50 milhões de linhas.
- Arquitetura em múltiplas etapas: a primeira divide arquivos muito grandes em partes menores, para que as aplicações seguintes leiam e processem em paralelo (multiprocessamento).
- Escrevo scripts e stored procedures em SQL Server para funcionalidades da aplicação e processamento de dados.

EN-US:

- Develop web applications and REST APIs with C#/.NET on the back end and AngularJS on the front end.
- Build and maintain a pipeline of .NET console applications that processes about 50 TXT/CSV files per day, each with 2 to 50 million lines.
- Multi-stage design: the first stage splits very large files into smaller chunks so downstream applications can read and process them in parallel (multiprocessing).
- Write SQL Server scripts and stored procedures supporting application features and data processing.

**2. Grupo Rivema** — Analista de Sistemas e Desenvolvedor .NET / Systems Analyst & .NET Developer · Rio Verde, Brasil / Brazil · Dez 2023 – Ago 2026 / Dec 2023 – Aug 2026

PT-BR:

- Desenvolvi soluções web e APIs em .NET seguindo SOLID e Clean Architecture, com front ends em Angular.
- Dei suporte, configurei e corrigi o ERP TOTVS Protheus para um grupo de 5 empresas (cerca de 100 colaboradores) nos módulos de Contabilidade Gerencial, Ativo Fixo, Compras, Estoque, Faturamento e Financeiro, além dos módulos DMS (Autopeças, Veículos e Oficina).
- Criei relatórios de negócio em SQL Server para as 5 empresas.
- Gerenciei e monitorei servidores e a infraestrutura de TI de todo o grupo.

EN-US:

- Developed web solutions and APIs in .NET following SOLID and Clean Architecture, with Angular front ends.
- Supported, configured and fixed the TOTVS Protheus ERP for a group of 5 companies (about 100 employees) across Management Accounting, Fixed Assets, Purchasing, Inventory, Billing and Finance, plus DMS modules (Auto Parts, Vehicles and Service Shop).
- Built business reports with SQL Server for all 5 companies.
- Managed and monitored servers and IT infrastructure for the whole group.

**3. Hospital Presbiteriano Dr. Gordon** — Analista de Sistemas e Desenvolvedor .NET / Systems Analyst & .NET Developer · Rio Verde, Brasil / Brazil · Abr 2021 – Dez 2023 / Apr 2021 – Dec 2023

PT-BR:

- Desenvolvi APIs e soluções web em .NET com SOLID e Clean Architecture em camadas, num time Agile Scrum.
- Analisei e monitorei o ERP TOTVS, corrigindo erros e bugs via configuração e correções diretas no banco de dados.
- Criei relatórios em SQL Server, entregues pelos modelos de relatório do ERP e por aplicações web.

EN-US:

- Developed APIs and web solutions in .NET using SOLID and layered Clean Architecture in an Agile Scrum team.
- Analyzed and monitored the TOTVS ERP, fixing errors and bugs through configuration and direct database corrections.
- Created SQL Server reports delivered through the ERP's reporting templates and through web applications.

### Projetos

**Financial**

| Item      | PT-BR                                     | EN-US                                    |
| --------- | ----------------------------------------- | ---------------------------------------- |
| Subtítulo | ERP financeiro e operacional multiempresa | Multi-company Financial & Operations ERP |
| Tipo      | Produto próprio · Back end + front end    | Own product · Back end + front end       |
| Período   | Jan 2023 – presente                       | Jan 2023 – present                       |
| Selo 1    | Em produção                               | In production                            |
| Selo 2    | Código privado                            | Private code                             |

Descrição PT-BR:

> ERP criado para atender várias empresas. Está em produção no primeiro cliente, uma transportadora, com 7 usuários ativos, e foi projetado para escalar conforme o número de usuários de cada cliente.

Descrição EN-US:

> An ERP built to serve multiple businesses. It runs in production at its first client, a trucking company, with 7 active users, and is designed to scale with each client's headcount.

Destaques PT-BR:

- Contas a pagar e a receber, bancos, notas fiscais, ordens de serviço, comissões e folha de motoristas, contratos de frete de grãos e adiantamentos de clientes.
- Back end em .NET 10 com Clean Architecture e CQRS (MediatR), EF Core e SQL Server, transações com Unit of Work, soft delete com filtros globais e isolamento de dados por empresa.
- Segurança com JWT em cookies HttpOnly, políticas de autorização dinâmicas por permissão, rate limiting e CORS.
- Azure Functions para importação de NF-e a cada hora e snapshots diários de saldos bancários; Azure Blob Storage para arquivos.
- Integrações com API de NF-e (Focus NFe) e consulta de CNPJ; relatórios em PDF com QuestPDF e exportação para Excel.
- Front end em Angular 18 com standalone components, Angular Material e Bootstrap 5, com relatórios responsivos para celular e desktop.
- Fluxo spec-first: cada funcionalidade é documentada e aprovada antes da implementação, com desenvolvimento assistido por IA.

Destaques EN-US:

- Accounts payable and receivable, banking, invoicing, service orders, driver commissions and payroll, grain freight contracts and customer advances.
- .NET 10 back end with Clean Architecture and CQRS (MediatR), EF Core and SQL Server, Unit of Work transactions, soft delete with global query filters and multi-company data isolation.
- Security with JWT in HttpOnly cookies, dynamic permission-based authorization policies, rate limiting and CORS.
- Azure Functions for hourly e-invoice (NF-e) import and daily bank balance snapshots; Azure Blob Storage for files.
- Integrations with an e-invoicing API (Focus NFe) and company registry lookup; PDF reports with QuestPDF and Excel export.
- Angular 18 front end with standalone components, Angular Material and Bootstrap 5, including responsive report pages for mobile and desktop.
- Spec-first workflow: each feature is documented and approved before implementation, using AI-assisted development.

Galeria:

| Arquivo                                          | Legenda PT-BR                                                                | Legenda EN-US                                                                    |
| ------------------------------------------------ | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `images/projects/financial-contas-a-receber.png` | Contas a Receber: resumo por natureza, forma de pagamento e maiores clientes | Accounts Receivable: breakdown by revenue type, payment method and top customers |
| `images/projects/financial-vendas.png`           | Vendas: resumo por natureza com detalhamento por grupo e produto             | Sales: breakdown by revenue type, drilling down into product groups and products |

Nota abaixo da galeria: "Telas com dados fictícios de um ambiente de testes." / "Screens show fictitious data from a test environment."

As imagens têm ~1350×800 px (proporção ~16:9,5) e fundo escuro; nas miniaturas use borda `--border` e cantos arredondados para que fiquem bem também no tema light.

### Formação

| PT-BR                                         | EN-US                                             | Instituição                                                  | Período                                   |
| --------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------- |
| Pós-graduação em Arquitetura de Software .NET | Postgraduate Degree in .NET Software Architecture | Faculdade Anhanguera · Online                                | Abr 2024 – Abr 2025 / Apr 2024 – Apr 2025 |
| Programa ASP.NET Core & .NET Expert           | ASP.NET Core & .NET Expert Program                | LD Treinamentos · Online                                     | Abr 2023 – Abr 2024 / Apr 2023 – Apr 2024 |
| Bacharelado em Sistemas de Informação         | B.S. in Information Systems                       | Universidade Estadual de Goiás (UEG) · Santa Helena de Goiás | Jan 2011 – Fev 2015 / Jan 2011 – Feb 2015 |

Detalhe do programa Expert (PT / EN): "Desenvolvimento de APIs, SOLID, CQRS, Repository, Clean e Hexagonal Architecture, Monolitos Modulares, Microsserviços, TDD, cache e resiliência." / "API development, SOLID, CQRS, Repository pattern, Clean and Hexagonal Architecture, Modular Monoliths, Microservices, TDD, caching and resilience."

Idiomas (pode aparecer junto da Formação): Português — Nativo / Portuguese — Native; Inglês — Avançado / English — Advanced.

### Contato

| Item   | PT-BR                                                                                  | EN-US                                                                      |
| ------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Título | Vamos conversar?                                                                       | Let's talk                                                                 |
| Texto  | Estou aberto a oportunidades remotas e novos projetos. Fique à vontade para me chamar. | I'm open to remote opportunities and new projects. Feel free to reach out. |

### Footer

"© {ano} Murilo Barros Cardoso · Feito com Angular" / "© {year} Murilo Barros Cardoso · Built with Angular"
