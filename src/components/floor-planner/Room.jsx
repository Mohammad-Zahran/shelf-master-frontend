import React from "react";

const Room = ({ width, height }) => {
  // Used to add the wall geometry of the planner.
  const wallThickness = 0.1;
  const wallHeight = 3;
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="lightgrey" />
      </mesh>
    </group>
  );
};

export default Room;
