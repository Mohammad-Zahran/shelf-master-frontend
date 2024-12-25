import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Hero2 = () => {
  const model = useGLTF('/scene.gltf'); // Adjust the path if needed

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <primitive object={model.scene} scale={1.5} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Hero2;
