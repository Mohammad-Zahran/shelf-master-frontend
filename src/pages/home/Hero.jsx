import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const FloatingModel = () => {
  const model = useGLTF("/assets/models/hero/scene.gltf"); // Ensure the path is correct
  const ref = useRef();

  // Animate hover effect for the model
  useFrame(({ clock }) => {
    ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5 - 2;
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

const Hero = () => {
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const modelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP Animations for Text and Model
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    // Text animation first
    tl.fromTo(
      textRef.current.querySelectorAll("h1, p"),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.3 } // Stagger for smooth entry
    )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1 },
        "-=0.5" // Overlap slightly with text animation
      )
      // Model animation starts after text is complete
      .fromTo(
        modelRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0 },
        "+=0.3" // Delay slightly after text animations
      );
  }, []);

  const handleButtonClick = () => {
    navigate("/products"); // Replace with the route you want to navigate to
  };

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 lg:px-36 h-auto lg:h-[500px] space-y-6 lg:space-y-0">
      {/* Left Section: Text and Button */}
      <div className="flex-1 text-center lg:text-left space-y-4" ref={textRef}>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-charcoal">
          Shelves for Sale Now
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button
          ref={buttonRef}
          className="btn round bg-steelBlue hover:bg-white text-white hover:text-steelBlue hover:border hover:border-steelBlue"
          onClick={handleButtonClick}
        >
          Shop Now
        </button>
      </div>

      {/* Right Section: 3D Model */}
      <div
        ref={modelRef}
        className="flex-1 h-[300px] md:h-[400px] lg:h-full opacity-0"
      >
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

export default Hero;
