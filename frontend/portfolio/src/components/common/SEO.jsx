import React, { useEffect } from 'react';

/**
 * SEO Component that dynamically manages document title, Meta tags,
 * OpenGraph, Twitter Cards, and Schema.org JSON-LD Structured Data.
 */
const SEO = ({
  title,
  description,
  name = 'Ahmed Ayyad',
  role = 'Full Stack Developer',
  url = 'https://my-protofoilo-rtte.vercel.app',
  image = '/og-preview.jpg',
  keywords = 'Full Stack Developer, MERN Stack, React, Node.js, Express, MongoDB, Tailwind CSS, Portfolio, Frontend, Backend',
}) => {
  const pageTitle = title ? `${title} | ${name} - ${role}` : `${name} | ${role} Portfolio`;
  const metaDescription =
    description ||
    `${name} - Full Stack MERN Developer specializing in building high-performance, scalable web applications with React, Node.js, and MongoDB.`;

  useEffect(() => {
    document.title = pageTitle;

    const setMetaTag = (nameAttr, key, content) => {
      let element = document.querySelector(`meta[${nameAttr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', metaDescription);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', name);

    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', metaDescription);
    setMetaTag('property', 'og:type', 'profile');
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:site_name', `${name} Portfolio`);

    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', metaDescription);
    setMetaTag('name', 'twitter:image', image);

    let scriptTag = document.querySelector('script#structured-data-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'structured-data-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${url}/#person`,
          name: name,
          jobTitle: role,
          url: url,
          image: image,
          knowsAbout: [
            'JavaScript',
            'TypeScript',
            'React.js',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Tailwind CSS',
            'RESTful APIs',
            'Cloudinary',
            'Full Stack Web Development',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${url}/#website`,
          url: url,
          name: pageTitle,
          description: metaDescription,
          publisher: {
            '@id': `${url}/#person`,
          },
        },
      ],
    };

    scriptTag.textContent = JSON.stringify(structuredData);
  }, [pageTitle, metaDescription, name, role, url, image, keywords]);

  return null;
};

export default SEO;
