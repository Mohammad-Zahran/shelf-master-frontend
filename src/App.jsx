import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import Reviews from "./components/Reviews";
import Company from "./components/Company";
import ModelViewer from "./components/ModelViewer";
import Popular from "./components/Popular";
import Test from "./components/Test";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Test />
      <Popular />
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
