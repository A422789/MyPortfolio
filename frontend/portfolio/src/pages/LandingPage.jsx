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
    <FeaturedWorkSection />
    <ExperienceSection />
    <TechStackSection />
    <BackgroundSection />
    <ContactSection />
  </>
);

export default LandingPage;
