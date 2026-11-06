import NavBar from '../components/layout/NavBar';
import FloatingWhatsApp from '../components/layout/FloatingWhatsApp';
import ScrollToTopButton from '../components/layout/ScrollToTopButton';
import Footer from '../components/layout/Footer';

const MainLayout = ({ children }) => (
  <div className="overflow-x-hidden min-h-screen bg-black">
    <NavBar />
    <FloatingWhatsApp />
    <ScrollToTopButton />
    <main>{children}</main>
    <div id="footer">
      <Footer />
    </div>
  </div>
);

export default MainLayout;

