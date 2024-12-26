import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Html,
  useGLTF,
} from "@react-three/drei";
import Lights from "./Lights";
import models from "../constants/models";
import * as THREE from "three";
import gsap from "gsap";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [rotationState, setRotationState] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("white");

  const controlRef = useRef();
  const groupRef = useRef();
  const cameraRef = useRef();
  const animationRef = useRef();

  useEffect(() => {
    // Animate camera to focus on the current model
    if (cameraRef.current) {
      const model = models[currentModelIndex];
      gsap.to(cameraRef.current.position, {
        duration: 1,
        x: model.position[0] + 2,
        y: model.position[1] + 2,
        z: 5,
        ease: "power3.out",
      });
    }
  }, [currentModelIndex]);

  useEffect(() => {
    // Rotation animation loop
    const rotateModel = () => {
      if (autoRotate && groupRef.current) {
        groupRef.current.rotation.y += 0.01;
      }
      animationRef.current = requestAnimationFrame(rotateModel);
    };

    rotateModel();

    return () => cancelAnimationFrame(animationRef.current);
  }, [autoRotate]);

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
    <div
      className="flex flex-col items-center justify-center h-screen px-4"
      style={{ backgroundColor }}
    >
      <h1 className="hero-title mb-6">3D Model Viewer</h1>

      <div className="flex flex-col items-center gap-6 w-full h-[80%]">
        <div className="relative w-full h-full rounded-lg">
          <Canvas className="w-full h-full">
            <PerspectiveCamera
              makeDefault
              position={[0, 0, 4]}
              ref={cameraRef}
            />
            <Lights />
            <OrbitControls
              ref={controlRef}
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.4}
              target={new THREE.Vector3(0, 0, 0)}
              onEnd={() =>
                setRotationState(controlRef.current.getAzimuthalAngle())
              }
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
          <button onClick={handlePrevious} className="control-btn">
            <IoIosArrowBack className="text-steelBlue text-3xl" />
          </button>
          <p className="text-lg font-medium text-charcoal">
            {currentModel.title}
          </p>
          <button onClick={handleNext} className="control-btn">
            <IoIosArrowForward className="text-steelBlue text-3xl" />
          </button>
        </div>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {autoRotate ? "Stop Rotation" : "Start Rotation"}
        </button>

        <button
          onClick={() =>
            setBackgroundColor((prev) =>
              prev === "white" ? "#f0f0f0" : "white"
            )
          }
          className="mt-4 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          Toggle Background
        </button>
      </div>
    </div>
  );
};

export default ModelViewer;
