/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Render at Night (https://sketchfab.com/Render_at_Night)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/floating-wall-shelf-unit-31b378d7ebd0494bb90109d7dd38b3f8
Title: Floating Wall Shelf Unit
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/floating_wall_shelf_unit/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.Wood_Veneer}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.White_Veneer}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/floating_wall_shelf_unit/scene.gltf')