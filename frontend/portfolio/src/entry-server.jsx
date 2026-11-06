import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import CaseStudyPage from './pages/CaseStudyPage';
import ProjectsArchivePage from './pages/ProjectsArchivePage';
import ExperiencePage from './pages/ExperiencePage';

const routeComponents = { CaseStudyPage, ProjectsArchivePage, ExperiencePage };

export async function render(pathname) {
  return renderToString(<StrictMode><StaticRouter location={pathname}><App routeComponents={routeComponents} /></StaticRouter></StrictMode>);
}
