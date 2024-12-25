import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Hero2 = () => {
  const model = useGLTF('/scene.gltf'); // Ensure the path is correct

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%', height: '500px' }}>
      {/* Left Section: Text and Button */}
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>Shelves for Sale Now</h1>
        <p style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#666' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button
          style={{
            padding: '0.8rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Shop Now
        </button>
      </div>

      {/* Right Section: 3D Model */}
      <div style={{ flex: 1 }}>
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
