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
