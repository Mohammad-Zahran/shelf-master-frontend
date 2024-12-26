import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html, useGLTF } from '@react-three/drei';
import Lights from './Lights';
import * as THREE from 'three';
import gsap from 'gsap';

const Model = ({ path, scale, position, rotation }) => {
  const { scene } = useGLTF(path);
  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
};

const ModelViewer = () => {
  const models = [
    {
      path: '/assets/models/book_shelf/scene1.gltf',
      title: 'Model 1',
      scale: [0.010, 0.010, 0.010],
      position: [0, -1, 0],
      rotation: [0, 0, 0],
    },
    {
      path: '/assets/models/floating_wall_shelf_unit/scene.gltf',
      title: 'Model 2',
      scale: [4, 4, 4],
      position: [0, 0, 0],
      rotation: [0, Math.PI / 4, 0],
    },
    {
      path: '/assets/models/warehouse_shelving_unit/scene.gltf',
      title: 'Model 3',
      scale: [0.018, 0.018, 0.018],
      position: [0, -1, 0],
    },
  ];

  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [rotationState, setRotationState] = useState(0);

  const controlRef = useRef();
  const groupRef = useRef();
  const cameraRef = useRef();

  useEffect(() => {
    // Animate camera to focus on the current model
    if (cameraRef.current) {
      const model = models[currentModelIndex];
      gsap.to(cameraRef.current.position, {
        duration: 1,
        x: model.position[0] + 2,
        y: model.position[1] + 2,
        z: 5,
        ease: 'power3.out',
      });
    }
  }, [currentModelIndex]);

  const handleNext = () => {
    setCurrentModelIndex((prevIndex) => (prevIndex + 1) % models.length);
  };

  const handlePrevious = () => {
    setCurrentModelIndex((prevIndex) =>
      prevIndex === 0 ? models.length - 1 : prevIndex - 1
    );
  };

  const currentModel = models[currentModelIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-4">
      <h1 className="text-2xl font-bold mb-4">3D Model Viewer</h1>

      <div className="flex flex-col items-center gap-6 w-full h-[80%]">
        <div className="relative w-full h-full rounded-lg">
          <Canvas className="w-full h-full">
            <PerspectiveCamera makeDefault position={[0, 0, 4]} ref={cameraRef} />
            <Lights />
            <OrbitControls
              ref={controlRef}
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.4}
              target={new THREE.Vector3(0, 0, 0)}
              onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
            />
            <Suspense
              fallback={
                <Html>
                  <div>Loading</div>
                </Html>
              }
            >
              <group ref={groupRef} position={[0, 0, 0]}>
                <Model
                  path={currentModel.path}
                  scale={currentModel.scale}
                  position={currentModel.position}
                  rotation={currentModel.rotation}
                />
              </group>
            </Suspense>
          </Canvas>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevious}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Previous
          </button>
          <p className="text-lg font-medium">{currentModel.title}</p>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelViewer;
