import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Hero2 = () => {
  const model = useGLTF('/scene.gltf'); // Ensure the path is correct

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas
        camera={{
          position: [0, 2, 10], // Camera is farther back
          fov: 50, // Field of view adjustment
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <primitive
          object={model.scene}
          scale={0.5} // Adjust the size of the model
          position={[0, 0, -5]} // Move the model farther on the Z-axis
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Hero2;
