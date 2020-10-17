import { Store } from '@component-controls/core';
import {
  getIndexPage,
  getHomePages,
  DocHomePagesPath,
  getDocPages,
  DocPagesPath,
} from '../create-pages';

export const getSiteMap = (store: Store): string => {
  const pages: { path?: string; priority: number }[] = [];
  //home page
  const { path } = getIndexPage(store) || {};
  pages.push({ path, priority: 1 });
  const homePages = getHomePages(store);
  homePages.forEach(({ path }: DocHomePagesPath) => {
    pages.push({ path, priority: 0.8 });
  });

  const docPages = getDocPages(store);
  docPages.forEach(({ path }: DocPagesPath) => {
    pages.push({ path, priority: 0.5 });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${pages
  .map(
    ({ path, priority }) =>
      `<url> <loc>${path}</loc><changefreq>daily</changefreq> <priority>${priority}</priority> </url>`,
  )
  .join('\n')}
</urlset>  
`;
  return sitemap;
};
