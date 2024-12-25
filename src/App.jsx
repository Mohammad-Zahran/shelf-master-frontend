import Gallery from './components/Gallery';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import Reviews from './components/Reviews';

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Highlights />
      <Reviews />
      <FAQ />
      <Gallery />
      <Footer />
      </>
  );
};

export default App;
