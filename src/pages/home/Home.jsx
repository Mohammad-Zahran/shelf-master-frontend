import React from "react";
import Hero from "./Hero";
import Popular from "./Popular";
import ModelViewer from "./ModelViewer";
import Company from "./Company";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Gallery from "./Gallery";

const Home = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <ModelViewer />
      <Company />
      <Testimonials />
      <FAQ />
      <Gallery />
    </div>
  );
};

export default Home;
