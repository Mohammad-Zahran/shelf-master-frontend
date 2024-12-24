import React from 'react'
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./Experience";
import { UI } from "./UI";

const Gallery = () => {
  return (
    <>
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
    </>
  )
}

export default Gallery;