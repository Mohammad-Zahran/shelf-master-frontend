import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const FloatingModel = () => {
  const model = useGLTF("/scene.gltf"); // Ensure the path is correct
  const ref = useRef();

  // Animate hover effect
  useFrame(({ clock }) => {
    ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5 - 2; // Adjust downward by subtracting a value
  });

  return (
    <>
      {/* Circle Background */}
      <mesh position={[0, -0.2, -2]} scale={3}>
        <circleGeometry args={[2.5, 64]} />
        <meshStandardMaterial color="#C8E6FF" side={THREE.DoubleSide} />
      </mesh>

      {/* 3D Model */}
      <primitive
        ref={ref}
        object={model.scene}
        scale={4.5}
        position={[0, -2.5, 0]}
      />
    </>
  );
};

const Hero2 = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 lg:px-36 h-auto lg:h-[500px] space-y-6 lg:space-y-0">
      {/* Left Section: Text and Button */}
      <div className="flex-1 text-center lg:text-left space-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
          Shelves for Sale Now
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button className="btn bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
          Shop Now
        </button>
      </div>

      {/* Right Section: 3D Model */}
      <div className="flex-1 h-[300px] md:h-[400px] lg:h-full">
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
    </section>
  );
};

export default Hero2;
