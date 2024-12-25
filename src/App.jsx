import Gallery from './components/Gallery';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import Reviews from './components/Reviews';
import Company from './components/Company';
import Hero2 from './components/Hero2';

const App = () => {
  return (
    <>
      <Navbar />
      <Hero2 />
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
