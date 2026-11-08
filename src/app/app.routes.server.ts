import { RenderMode, ServerRoute } from '@angular/ssr';

/** Single-page site: only "/" exists and it is prerendered at build time (SSG). */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
