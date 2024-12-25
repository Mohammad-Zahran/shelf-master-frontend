import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const FloatingModel = () => {
  const model = useGLTF('/scene.gltf'); // Ensure the path is correct
  const ref = useRef();

  // Animate hover effect
  useFrame(({ clock }) => {
    ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5; // Up and down hover
  });

  return (
    <>
      {/* Circle Background */}
      <mesh position={[0, -1.5, -1]} scale={4}>
        <circleGeometry args={[2.5, 64]} />
        <meshStandardMaterial color="#E4F0FA" side={THREE.DoubleSide} />
      </mesh>
      
      {/* 3D Model */}
      <primitive
        ref={ref}
        object={model.scene}
        scale={4.5} // Adjust size
        position={[0, -1.5, 0]} // Center position
      />
    </>
  );
};

const Hero2 = () => {
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
            position: [0, 3, 25], // Adjust the camera position
            fov: 40, // Field of view adjustment
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <FloatingModel />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </div>
  );
};

export default Hero2;
