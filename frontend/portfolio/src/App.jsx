import React, { Suspense, lazy } from 'react';
import './App.css';
import { PortfolioProvider } from './context/PortfolioContext';
import SEO from './components/common/SEO';
import Navbar from './components/layout/Navbar';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import SkeletonLoader from './components/common/SkeletonLoader';

// Lazy load heavy below-the-fold sections for maximum PageSpeed & minimal initial JS payload
const Projects = lazy(() => import('./pages/Projects'));
const Certificates = lazy(() => import('./pages/Certificates'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <PortfolioProvider>
      <SEO />
      <div className="overflow-x-hidden bg-black text-white min-h-screen selection:bg-[#cea605]/30 selection:text-[#f2de8c]">
        <Navbar />
        <FloatingWhatsApp />

        <main>
          <div id="home">
            <Home />
          </div>
          <div id="about">
            <About />
          </div>
          <div id="skills">
            <Skills />
          </div>

          <div id="projects">
            <Suspense fallback={
              <section className="min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4">
                <SkeletonLoader count={3} />
              </section>
            }>
              <Projects />
            </Suspense>
          </div>

          <div id="certificates">
            <Suspense fallback={
              <section className="min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4">
                <SkeletonLoader count={3} />
              </section>
            }>
              <Certificates />
            </Suspense>
          </div>

          <div id="contact">
            <Suspense fallback={
              <section className="min-h-screen bg-black flex items-center justify-center py-20">
                <div className="w-10 h-10 border-2 border-[#cea605]/20 border-t-[#cea605] rounded-full animate-spin" />
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
  );
}

export default App;
