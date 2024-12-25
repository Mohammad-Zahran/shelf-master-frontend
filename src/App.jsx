import Gallery from './components/Gallery';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import Reviews from './components/Reviews';
import Company from './components/Company';

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Highlights />
      <Company />
      <Reviews />
      <FAQ />
      <Gallery />
      <Footer />
      </>
  );
};

export default App;
