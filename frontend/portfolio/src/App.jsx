import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import pages from 'virtual:page-metadata';
import './App.css';
import { ProfileProvider } from './context/ProfileContext';
import MainLayout from './layouts/MainLayout';
import ScrollToHash from './components/layout/ScrollToHash';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import PageMetadata from './components/layout/PageMetadata';

const defaultPages = {
  CaseStudyPage: lazy(() => import('./pages/CaseStudyPage')),
  ProjectsArchivePage: lazy(() => import('./pages/ProjectsArchivePage')),
  ExperiencePage: lazy(() => import('./pages/ExperiencePage')),
};

function KnownPage({ children }) {
  const { pathname } = useLocation();
  return pages.some((page) => page.path === pathname) ? children : <NotFoundPage />;
}

function App({ routeComponents = defaultPages }) {
  const { CaseStudyPage, ProjectsArchivePage, ExperiencePage } = routeComponents;
  return (
    <ProfileProvider>
      <PageMetadata />
      <ScrollToHash />
      <MainLayout>
        <Suspense fallback={<div role="status" className="min-h-screen pt-32 text-center text-[#f2de8c]">Loading page…</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/work/:slug" element={<KnownPage><CaseStudyPage /></KnownPage>} />
          <Route path="/projects" element={<ProjectsArchivePage />} />
          <Route path="/experience/:slug" element={<KnownPage><ExperiencePage /></KnownPage>} />
          <Route path="/credentials" element={<Navigate to="/#experience" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </MainLayout>
    </ProfileProvider>
  );
}

export default App;
