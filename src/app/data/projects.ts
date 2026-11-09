import { GalleryImage } from '../shared/lightbox/lightbox';

export interface Project {
  id: string;
  /** Product name: not translated. */
  title: string;
  subtitleKey: string;
  typeKey: string;
  periodKey: string;
  /** Shows the "In production" badge. */
  inProduction: boolean;
  /** Shows the "Private code" badge (with a lock) instead of a repository link. */
  privateCode: boolean;
  repositoryUrl?: string;
  descriptionKey: string;
  highlightKeys: readonly string[];
  /** Technology names: not translated. */
  stack: readonly string[];
  gallery: readonly GalleryImage[];
  galleryNoteKey?: string;
}

/**
 * Portfolio projects. To add one, append an entry here and its keys under `projects.<id>` in
 * both `src/i18n/*.json` files.
 */
export const PROJECTS: readonly Project[] = [
  {
    id: 'financial',
    title: 'Financial',
    subtitleKey: 'projects.financial.subtitle',
    typeKey: 'projects.financial.type',
    periodKey: 'projects.financial.period',
    inProduction: true,
    privateCode: true,
    descriptionKey: 'projects.financial.description',
    highlightKeys: Array.from({ length: 7 }, (_, i) => `projects.financial.h${i + 1}`),
    stack: [
      '.NET 10',
      'C#',
      'Angular 18',
      'SQL Server',
      'EF Core',
      'MediatR',
      'CQRS',
      'Clean Architecture',
      'Azure Functions',
      'Azure Blob Storage',
      'JWT',
      'QuestPDF',
    ],
    gallery: [
      {
        src: 'images/projects/financial-contas-a-receber.png',
        width: 1355,
        height: 802,
        captionKey: 'projects.financial.gallery.contasReceber',
      },
      {
        src: 'images/projects/financial-vendas.png',
        width: 1344,
        height: 924,
        captionKey: 'projects.financial.gallery.vendas',
      },
    ],
    galleryNoteKey: 'projects.financial.galleryNote',
  },
];
