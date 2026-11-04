import React from 'react';
import HeroSection from '../sections/HeroSection';
import FeaturedWorkSection from '../sections/FeaturedWorkSection';
import ExperienceSection from '../sections/ExperienceSection';
import TechStackSection from '../sections/TechStackSection';
import BackgroundSection from '../sections/BackgroundSection';
import ContactSection from '../sections/ContactSection';

const LandingPage = () => (
  <>
    <div id="home">
      <HeroSection />
    </div>
    <div id="projects">
      <FeaturedWorkSection />
    </div>
    <div id="experience">
      <ExperienceSection />
    </div>
    <div id="skills">
      <TechStackSection />
    </div>
    <div id="about">
      <BackgroundSection />
    </div>
    <div id="contact">
      <ContactSection />
    </div>
  </>
);

export default LandingPage;
