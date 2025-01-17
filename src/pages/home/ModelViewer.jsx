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
import { FaPlay, FaPause, FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { MdOutlineZoomIn } from "react-icons/md";
import { MdOutlineZoomOut } from "react-icons/md";

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

  const handleZoom = (zoomIn) => {
    if (cameraRef.current) {
      const zoomFactor = zoomIn ? 0.9 : 1.1;
      gsap.to(cameraRef.current.position, {
        duration: 0.5,
        x: cameraRef.current.position.x * zoomFactor,
        y: cameraRef.current.position.y * zoomFactor,
        z: cameraRef.current.position.z * zoomFactor,
        ease: "power3.out",
      });
    }
  };

  const currentModel = models[currentModelIndex];
  const textColor =
    backgroundColor === "white" ? "text-charcoal" : "text-white";

  return (
    <div
      className={`flex flex-col items-center justify-center h-auto px-4 py-8 space-y-6 ${
        backgroundColor === "white" ? "bg-white" : "bg-black"
      }`}
    >
      <div className="text-center space-y-2">
        <p
          className={`subtitle ${textColor} !important text-left md:w-[520px] mx-auto`}
        >
          Popular Shelves
        </p>
        <h2 className={`title ${textColor} !important md:w-[520px] mx-auto`}>
          Best Shelves for Sale
        </h2>
      </div>

      {/* 3D Model Viewer */}
      <div className="w-full h-[300px] md:h-[500px] lg:h-[600px]">
        <Canvas className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 4]} ref={cameraRef} />
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

      {/* Controls */}
      <div className="flex items-center justify-between w-full max-w-md mx-auto gap-4">
        <button onClick={handlePrevious} className="control-btn">
          <IoIosArrowBack className="text-steelBlue text-3xl" />
        </button>
        <p className={`text-lg font-medium ${textColor}`}>
          {currentModel.title}
        </p>
        <button onClick={handleNext} className="control-btn">
          <IoIosArrowForward className="text-steelBlue text-3xl" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="btn round"
        >
          {autoRotate ? (
            <>
              <FaPause className="text-lg" />
              Pause
            </>
          ) : (
            <>
              <FaPlay className="text-lg" />
              Start
            </>
          )}
        </button>

        <button
          onClick={() =>
            setBackgroundColor((prev) => (prev === "white" ? "black" : "white"))
          }
          className="btn round"
        >
          {backgroundColor === "white" ? (
            <>
              <FaMoon className="text-yellow-500 text-lg" />
              Dark Mode
            </>
          ) : (
            <>
              <IoMdSunny className="text-yellow-300 text-lg" />
              Light Mode
            </>
          )}
        </button>

        <button onClick={() => handleZoom(true)} className="btn round">
          Zoom In <MdOutlineZoomIn className="text-xl" />
        </button>
        <button onClick={() => handleZoom(false)} className="btn round">
          Zoom Out <MdOutlineZoomOut />
        </button>
      </div>
    </div>
  );
};

export default ModelViewer;
