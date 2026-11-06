import { profileData } from '../content/profileData.js';

export const site = {
  origin: 'https://my-portfolio-rtte.vercel.app',
  name: 'Ahmed Ayyad Portfolio',
  person: {
    name: profileData.name,
    title: profileData.title,
    sameAs: [profileData.github, profileData.linkedin],
  },
  description: 'Ahmed Ayyad, Backend-Focused Full-Stack Developer in Islamabad. Explore Node.js, Express, MongoDB and React projects, technical case studies, and verified credentials.',
  image: '/social/default.jpg',
};

export const canonicalUrl = (pathname) => new URL(pathname, `${site.origin}/`).href;

export function getPageMetadata(pages, pathname) {
  return pages.find((page) => page.path === pathname) ?? {
    path: pathname,
    title: `Page not found | ${site.person.name}`,
    description: 'This page could not be found. Explore Ahmed Ayyad\'s projects and experience.',
    image: site.image,
    noindex: true,
  };
}

export function structuredData(page) {
  if (page.noindex) return null;
  const url = canonicalUrl(page.path);
  const personId = `${site.origin}/#person`;
  const websiteId = `${site.origin}/#website`;
  const graph = [
    { '@type': 'Person', '@id': personId, name: site.person.name, jobTitle: site.person.title, url: `${site.origin}/`, sameAs: site.person.sameAs },
    { '@type': 'WebSite', '@id': websiteId, name: site.name, url: `${site.origin}/`, publisher: { '@id': personId } },
    { '@type': 'WebPage', '@id': `${url}#page`, url, name: page.title, description: page.description, isPartOf: { '@id': websiteId }, about: { '@id': personId }, ...(page.breadcrumbs ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}) },
  ];
  if (page.breadcrumbs) graph.push({
    '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
    itemListElement: page.breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: canonicalUrl(item.path) })),
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

export function renderMetadata(page, { noindex = false } = {}) {
  const url = canonicalUrl(page.path);
  const image = canonicalUrl(page.image ?? site.image);
  const tags = [
    `<title data-seo>${escapeHtml(page.title)}</title>`,
    `<meta data-seo name="description" content="${escapeHtml(page.description)}">`,
    `<meta data-seo name="author" content="${escapeHtml(site.person.name)}">`,
    `<meta data-seo name="robots" content="${page.noindex || noindex ? 'noindex, follow' : 'index, follow'}">`,
    ...(!page.noindex ? [`<link data-seo rel="canonical" href="${escapeHtml(url)}">`] : []),
    ...Object.entries({ 'og:type': 'website', 'og:site_name': site.name, 'og:title': page.title, 'og:description': page.description, 'og:url': url, 'og:image': image, 'og:image:width': '1200', 'og:image:height': '630', 'og:image:alt': page.imageAlt ?? `${site.person.name} portfolio` }).map(([property, content]) => `<meta data-seo property="${property}" content="${escapeHtml(content)}">`),
    ...Object.entries({ 'twitter:card': 'summary_large_image', 'twitter:title': page.title, 'twitter:description': page.description, 'twitter:image': image, 'twitter:image:alt': page.imageAlt ?? `${site.person.name} portfolio` }).map(([name, content]) => `<meta data-seo name="${name}" content="${escapeHtml(content)}">`),
  ];
  const schema = structuredData(page);
  if (schema) tags.push(`<script data-seo type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`);
  return tags.join('\n');
}
