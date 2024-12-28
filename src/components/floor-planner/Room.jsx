import React from "react";

const Room = ({ width, height }) => {
  const wallThickness = 0.1;
  const wallHeight = 3;

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="lightgrey" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, wallHeight / 2, -height / 2]}>
        <boxGeometry args={[width, wallHeight, wallThickness]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh
        position={[width / 2, wallHeight / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <boxGeometry args={[height, wallHeight, wallThickness]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh
        position={[-width / 2, wallHeight / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[height, wallHeight, wallThickness]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh
        position={[0, wallHeight / 2, height / 2]}
        rotation={[0, Math.PI, 0]}
      >
        <boxGeometry args={[width, wallHeight, wallThickness]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
};

export default Room;

/*
Note:
The wall Thickness and wallHeight can be customized by the user.
<group>: A container for grouping related 3D objects, ensuring transformations (like position, rotation, or scaling) are applied collectively.
<mesh>: Represents a 3D object in the scene.
rotation={[-Math.PI / 2, 0, 0]}: Rotates the floor 90 degrees around the X-axis to lie flat. (Three.js positions the plane upright by default.)
position={[0, 0.5, 0]}: Moves the floor slightly above the origin (0, 0, 0) by 0.5 units in the Y-axis.
<planeGeometry>: Defines the shape of the floor as a flat rectangular plane, with dimensions [width, height].
<meshStandardMaterial>: Gives the floor a basic material with a lightgrey color. This material interacts with light in the scene.
*/