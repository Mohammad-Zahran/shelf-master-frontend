import React from "react";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";

const Room = ({ width, height }) => {
  const { wallHeight } = useFloorPlanner(); // Access wallHeight from context

  const wallThickness = 0.1;

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
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
