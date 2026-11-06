import { caseStudiesData } from '../src/content/caseStudiesData.js';
import { experienceData } from '../src/content/experienceData.js';
import { site } from '../src/seo/site.js';

export function getPages() {
  const pages = [
    { path: '/', title: `${site.person.name} | ${site.person.title}`, description: site.description, image: site.image, imageAlt: 'Ahmed Ayyad — Backend-Focused Full-Stack Developer' },
    { path: '/projects', title: `Projects & Case Studies | ${site.person.name}`, description: 'Explore Ahmed Ayyad\'s full-stack and backend systems, cloud learning projects, frontend applications, and academic computer science work.', image: site.image },
    ...caseStudiesData.map((study) => ({
      path: `/work/${study.slug}`, title: `${study.title} | ${site.person.name}`,
      description: study.subtitle, image: `/social/${study.slug}.jpg`, imageAlt: study.title,
      breadcrumbs: [{ name: 'Overview', path: '/' }, { name: 'Case Studies', path: '/projects' }, { name: study.title, path: `/work/${study.slug}` }],
    })),
    ...experienceData.map((experience) => ({
      path: `/experience/${experience.slug}`, title: `${experience.organization} — ${experience.title} | ${site.person.name}`,
      description: experience.summary, image: site.image,
      breadcrumbs: [{ name: 'Overview', path: '/' }, { name: 'Experience', path: '/#experience' }, { name: experience.organization, path: `/experience/${experience.slug}` }],
    })),
  ];
  if (new Set(pages.map((page) => page.path)).size !== pages.length) throw new Error('Duplicate public route');
  return pages;
}

export const auditPaths = ['/', '/projects', '/work/he-skincare', '/experience/ibm', '/experience/codealpha'];
