import React, { lazy, Suspense } from 'react';
import './App.css';
import { ProfileProvider } from './context/ProfileContext';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import FloatingWhatsApp from './Components/FloatingWhatsApp';

// Below-the-fold sections lazy-loaded to optimize initial load & eliminate unused JavaScript
const Projects = lazy(() => import('./Pages/Projects'));
const Skills = lazy(() => import('./Pages/Skills'));
const Certificate = lazy(() => import('./Pages/Certificate'));
const About = lazy(() => import('./Pages/About'));
const Contact = lazy(() => import('./Pages/Contact'));

function App() {
  return (
    <ProfileProvider>
      <div className="overflow-x-hidden min-h-screen bg-black">
        <NavBar />
        <FloatingWhatsApp />
        <main>
          <div id="home"><Home /></div>
          <Suspense fallback={<div className="min-h-[40vh] bg-black" />}>
            <div id="projects"><Projects /></div>
            <div id="skills"><Skills /></div>
            <div id="certificate"><Certificate /></div>
            <div id="about"><About /></div>
            <div id="contact"><Contact /></div>
          </Suspense>
        </main>
        <div id="footer"><Footer /></div>
      </div>
    </ProfileProvider>
  );
}

export default App;
