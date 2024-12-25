import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Hero2 = () => {
  const model = useGLTF('/scene.gltf'); // Ensure the path is correct

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas
        camera={{
          position: [0, 3, 25], // Move the camera even farther back
          fov: 75, // Slightly increase the field of view for a more zoomed-out effect
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <primitive
          object={model.scene}
          scale={0.08} // Reduce the scale slightly more if needed
          position={[0, -1.5, 0]} // Center the model and adjust its height
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Hero2;
