import './App.css';
import { ProfileProvider } from './context/ProfileContext';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import About from './Pages/About';
import Skills from './Pages/Skills';
import Projects from './Pages/Projects';
import Certificate from './Pages/Certificate';
import Contact from './Pages/Contact';
import Footer from './Components/Footer';
import FloatingWhatsApp from './Components/FloatingWhatsApp';

function App() {
  return (
    <ProfileProvider>
      <div className="overflow-x-hidden min-h-screen bg-black">
        <NavBar />
        <FloatingWhatsApp />
        <main>
          <div id="home"><Home /></div>
          <div id="projects"><Projects /></div>
          <div id="skills"><Skills /></div>
          <div id="certificate"><Certificate /></div>
          <div id="about"><About /></div>
          <div id="contact"><Contact /></div>
        </main>
        <div id="footer"><Footer /></div>
      </div>
    </ProfileProvider>
  );
}

export default App;
