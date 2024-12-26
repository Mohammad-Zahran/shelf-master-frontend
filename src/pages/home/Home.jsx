import React from "react";
import Hero from "./Hero";
import Popular from "./Popular";
import ModelViewer from "./ModelViewer";
import Company from "./Company";
import Reviews from "./Reviews";
import FAQ from "../../components/FAQ";
import Gallery from "./Gallery";

const Home = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <ModelViewer />
      <Company />
      <Reviews />
      <FAQ />
      <Gallery />
    </div>
  );
};

export default Home;
