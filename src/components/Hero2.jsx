import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Hero2 = () => {
  const model = useGLTF('/scene.gltf'); // Ensure the path is correct

  return (
    <div className="flex items-center justify-between px-36 h-[500px]">
      {/* Left Section: Text and Button */}
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
          Shelves for Sale Now
        </h1>
        <p className="text-lg text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button className="btn">
          Shop Now
        </button>
      </div>

      {/* Right Section: 3D Model */}
      <div className="flex-1 h-full">
        <Canvas
          camera={{
            position: [0, 3, 25], // Move the camera farther back
            fov: 75, // Field of view adjustment
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <primitive
            object={model.scene}
            scale={0.08} // Scale the model
            position={[0, -1.5, 0]} // Center the model
          />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </div>
  );
};

export default Hero2;
