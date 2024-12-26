import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import Reviews from "./components/Reviews";
import Company from "./components/Company";
import ModelViewer from "./components/ModelViewer";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ModelViewer />
      <Company />
      <Reviews />
      <FAQ />
      <Gallery />
      <Footer />
    </>
  );
};

export default App;
