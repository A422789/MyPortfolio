import React, { Suspense, lazy, useEffect } from 'react';
import './App.css';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';
import SEO from './components/common/SEO';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Skills from './pages/Skills';
import SkeletonLoader from './components/common/SkeletonLoader';
import API from './api/axios';

// Lazy load heavy below-the-fold sections
const Projects     = lazy(() => import('./pages/Projects'));
const Certificates = lazy(() => import('./pages/Certificates'));
const About        = lazy(() => import('./pages/About'));
const Contact      = lazy(() => import('./pages/Contact'));

const VISIT_FLAG_KEY = 'portfolio_visited';

function App() {
  // ── Unique Visit Tracker ──────────────────────────────────────────
  useEffect(() => {
    const hasVisited = localStorage.getItem(VISIT_FLAG_KEY);
    if (!hasVisited) {
      API.post('/visit')
        .then(() => localStorage.setItem(VISIT_FLAG_KEY, 'true'))
        .catch(() => {}); // Silently ignore — never affect UX
    }
  }, []);

  return (
    <ThemeProvider>
      <PortfolioProvider>
        <SEO />
        <div className="overflow-x-hidden min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-1)' }}>
          <Navbar />

          {/*
           * Section order (recruiter-optimised):
           * Hero → Projects → Skills → Certificates → About → Contact
           */}
          <main id="main-content">

            <div id="home">
              <Home />
            </div>

            <div id="projects">
              <Suspense fallback={
                <section style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }} className="flex flex-col items-center justify-center py-20 px-4">
                  <SkeletonLoader count={3} />
                </section>
              }>
                <Projects />
              </Suspense>
            </div>

            <div id="skills">
              <Suspense fallback={
                <section style={{ minHeight: '60vh', backgroundColor: 'var(--color-bg)' }} className="flex items-center justify-center py-20 px-4">
                  <SkeletonLoader count={6} />
                </section>
              }>
                <Skills />
              </Suspense>
            </div>

            <div id="certificates">
              <Suspense fallback={
                <section style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }} className="flex flex-col items-center justify-center py-20 px-4">
                  <SkeletonLoader count={3} />
                </section>
              }>
                <Certificates />
              </Suspense>
            </div>

            <div id="about">
              <Suspense fallback={
                <section style={{ minHeight: '60vh', backgroundColor: 'var(--color-bg)' }} className="flex items-center justify-center py-20 px-4">
                  <div className="w-10 h-10 border-2 border-t-[var(--color-accent)] rounded-full animate-spin" style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-accent)' }} />
                </section>
              }>
                <About />
              </Suspense>
            </div>

            <div id="contact">
              <Suspense fallback={
                <section style={{ minHeight: '80vh', backgroundColor: 'var(--color-bg)' }} className="flex items-center justify-center py-20">
                  <div className="w-10 h-10 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-accent)' }} />
                </section>
              }>
                <Contact />
              </Suspense>
            </div>

          </main>

          <div id="footer">
            <Footer />
          </div>
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
