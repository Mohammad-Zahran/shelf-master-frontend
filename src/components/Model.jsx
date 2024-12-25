import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { yellowImg } from "./../utils/index";
import * as THREE from 'three';

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "Test",
    img: yellowImg,
  });

  // camera control for the model view
  const cameraControllSmall = useRef();
  const cameraControllLarge = useRef();

  const small = useRef(new THREE.Group());

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);
  return (
    <div className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a close look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
