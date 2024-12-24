import { useCursor, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { easing } from "maath";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bone,
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  MathUtils,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  SRGBColorSpace,
  Uint16BufferAttribute,
  Vector3,
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { pageAtom, pages } from "./UI";

/*
Some Notes for what the imported classed are used for:

useCursor and useTexture are utilities from @react-three/drei for 3D interactions.
useFrame is a React hook provided by @react-three/fiber to hook into the render loop of the 3D scene.
useAtom is a hook from Jotai, a state management library.
Bone, Skeleton, SkinnedMesh: Used for skeletal animation.
BoxGeometry, MeshStandardMaterial: Define 3D geometries and materials for rendering objects.
Vector3, Color: Represent mathematical vectors and colors in 3D space.
degToRad: A utility function for converting degrees to radians.
*/

// These constants control specific parameters, such as the speed and intensity of animations or transformations.
const easingFactor = 0.5; // Controls the speed of the easing
const easingFactorFold = 0.3; // Controls the speed of the easing
const insideCurveStrength = 0.18; // Controls the strength of the curve
const outsideCurveStrength = 0.05; // Controls the strength of the curve
const turningCurveStrength = 0.09; // Controls the strength of the curve

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

const pageGeometry = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2
);

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes = [];
const skinWeights = [];

for (let i = 0; i < position.count; i++) {
  // ALL VERTICES
  vertex.fromBufferAttribute(position, i); // get the vertex
  const x = vertex.x; // get the x position of the vertex

  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH)); // calculate the skin index
  let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH; // calculate the skin weight

  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0); // set the skin indexes
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0); // set the skin weights
}

// This code adds skinning data (bone indices and weights) to the pageGeometry object as attributes. These attributes are required for skeletal animation in Three.js, enabling smooth deformation of the geometry during animations like bending or turning.
pageGeometry.setAttribute(
  "skinIndex",
  new Uint16BufferAttribute(skinIndexes, 4)
);
pageGeometry.setAttribute(
  "skinWeight",
  new Float32BufferAttribute(skinWeights, 4)
);

const whiteColor = new Color("white");
const emissiveColor = new Color("orange");

const pageMaterials = [
  new MeshStandardMaterial({
    color: whiteColor,
  }),
  new MeshStandardMaterial({
    color: "#111",
  }),
  new MeshStandardMaterial({
    color: whiteColor,
  }),
  new MeshStandardMaterial({
    color: whiteColor,
  }),
];

pages.forEach((page) => {
  useTexture.preload(`/public/assets/textures/${page.front}.jpg`);
  useTexture.preload(`/public/assets/textures/${page.back}.jpg`);
  useTexture.preload(`/public/assets/textures/book-cover-roughness.jpg`);
});

const Page = ({ number, front, back, page, opened, bookClosed, ...props }) => {
  const [picture, picture2, pictureRoughness] = useTexture([
    `/public/assets/textures/${front}.jpg`,
    `/public/assets/textures/${back}.jpg`,
    ...(number === 0 || number === pages.length - 1
      ? [`/public/assets/textures/book-cover-roughness.jpg`]
      : []),
  ]);
  picture.colorSpace = picture2.colorSpace = SRGBColorSpace;
  const group = useRef();
  const turnedAt = useRef(0);
  const lastOpened = useRef(opened);

  const skinnedMeshRef = useRef();

  const manualSkinnedMesh = useMemo(() => {
    const bones = [];
    for (let i = 0; i <= PAGE_SEGMENTS; i++) {
      let bone = new Bone();
      bones.push(bone);
      if (i === 0) {
        bone.position.x = 0;
      } else {
        bone.position.x = SEGMENT_WIDTH;
      }
      if (i > 0) {
        bones[i - 1].add(bone); 
      }
    }
    const skeleton = new Skeleton(bones);

    const materials = [
        ...pageMaterials,
        new MeshStandardMaterial({
          color: whiteColor,
          map: picture,
          ...(number === 0
            ? {
                roughnessMap: pictureRoughness,
              }
            : {
                roughness: 0.1,
              }),
          emissive: emissiveColor,
          emissiveIntensity: 0,
        }),
        new MeshStandardMaterial({
          color: whiteColor,
          map: picture2,
          ...(number === pages.length - 1
            ? {
                roughnessMap: pictureRoughness,
              }
            : {
                roughness: 0.1,
              }),
          emissive: emissiveColor,
          emissiveIntensity: 0,
        }),
      ];
  
};
