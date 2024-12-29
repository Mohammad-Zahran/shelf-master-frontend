import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Html,
  useGLTF,
} from "@react-three/drei";
import Lights from "../../components/home/Lights";
import models from "../../constants/models";
import * as THREE from "three";
import gsap from "gsap";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaPlay, FaPause, FaToggleOff, FaToggleOn } from "react-icons/fa";

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
      <div className="text-left mr mb-8">
        <p className="subtitle">Popular Shelves</p>
        <h2 className="title md:w-[520px]">Best Shelves for Sale</h2>
      </div>
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

        <div className="flex items-center gap-4">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="btn px-5 py-2 rounded-3xl bg-steelBlue my-5 text-white hover:bg-transparent border border-transparent hover:border hover:text-steelBlue hover:border-steelBlue"
          >
            {autoRotate ? (
              <>
                <FaPause className="text-lg" />
                Pause Rotation
              </>
            ) : (
              <>
                <FaPlay className="text-lg" />
                Start Rotation
              </>
            )}
          </button>

          <button
            onClick={() =>
              setBackgroundColor((prev) =>
                prev === "white" ? "#f0f0f0" : "white"
              )
            }
            className="btn px-5 py-2 rounded-3xl bg-steelBlue my-5 text-white hover:bg-transparent border border-transparent hover:border hover:text-steelBlue hover:border-steelBlue"
          >
            {backgroundColor === "white" ? (
              <>
                <FaToggleOff className="text-red-500 text-lg" />
                Dark Background
              </>
            ) : (
              <>
                <FaToggleOn className="text-green-500 text-lg" />
                Light Background
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelViewer;
