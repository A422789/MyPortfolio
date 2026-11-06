import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import pages from 'virtual:page-metadata';
import { getPageMetadata, renderMetadata } from '../../seo/site';

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const noindex = document.documentElement.dataset.noindex === 'true';
    const template = document.createElement('template');
    template.innerHTML = renderMetadata(getPageMetadata(pages, pathname), { noindex });
    document.head.querySelectorAll('[data-seo]').forEach((element) => element.remove());
    document.head.append(template.content);
  }, [pathname]);
  return null;
}
