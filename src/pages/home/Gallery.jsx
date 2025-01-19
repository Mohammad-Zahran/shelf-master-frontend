import React from "react";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "../../components/home/Experience";
import { UI } from "../../components/home/UI";

const Gallery = () => {
  return (
    <div className="mt-5">
      <div className="section-container my-20 relative px-4 md:px-8 lg:px-16">
        <p className="subtitle">Customer Favorites</p>
        <h2 className="title md:w-[520px] text-charcoal">Popular Shelves</h2>
      </div>
      {/* Book section */}
      <div className="relative w-full h-[70vh] flex items-center justify-center mb-8">
        <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
          <group position-y={0}>
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
          </group>
        </Canvas>
        <Loader />
      </div>

      {/* UI section */}
      <section
        id="ui-section"
        className="w-full py-4 bg-gradient-to-b white to-gray-900 flex flex-col items-center"
      >
        <UI />
      </section>
    </div>
  );
};

export default Gallery;
