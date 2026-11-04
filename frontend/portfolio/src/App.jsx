import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ProfileProvider } from './context/ProfileContext';
import MainLayout from './layouts/MainLayout';
import ScrollToHash from './components/layout/ScrollToHash';
import LandingPage from './pages/LandingPage';
import CaseStudyPage from './pages/CaseStudyPage';
import ProjectsArchivePage from './pages/ProjectsArchivePage';
import CredentialsPage from './pages/CredentialsPage';

function App() {
  return (
    <ProfileProvider>
      <ScrollToHash />
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/projects" element={<ProjectsArchivePage />} />
          <Route path="/credentials" element={<CredentialsPage />} />
        </Routes>
      </MainLayout>
    </ProfileProvider>
  );
}

export default App;
