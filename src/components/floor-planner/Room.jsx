import React from "react";

const Room = ({ width, height, wallHeight }) => {
  const wallThickness = 0.1; // Thickness of the walls
  const wallOpacity = 0.5; // Adjust the opacity level (0: fully transparent, 1: fully opaque)

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
        <meshStandardMaterial color="white" transparent={true} opacity={wallOpacity} />
      </mesh>
      <mesh
        position={[width / 2, wallHeight / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <boxGeometry args={[height, wallHeight, wallThickness]} />
        <meshStandardMaterial color="white" transparent={true} opacity={wallOpacity} />
      </mesh>
      <mesh
        position={[-width / 2, wallHeight / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[height, wallHeight, wallThickness]} />
        <meshStandardMaterial color="white" transparent={true} opacity={wallOpacity} />
      </mesh>
      <mesh
        position={[0, wallHeight / 2, height / 2]}
        rotation={[0, Math.PI, 0]}
      >
        <boxGeometry args={[width, wallHeight, wallThickness]} />
        <meshStandardMaterial color="white" transparent={true} opacity={wallOpacity} />
      </mesh>
    </group>
  );
};

export default Room;
