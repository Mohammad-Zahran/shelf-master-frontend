import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";

const Furniture = ({ modelPath, scale = 1, index, roomWidth, roomHeight, setControlsEnabled }) => {
  const {
    furnitureItems,
    updateFurniturePosition,
    updateFurnitureRotation,
    selectedFurnitureIndex,
    setSelectedFurnitureIndex,
  } = useFloorPlanner();
  const { position, rotation } = furnitureItems[index];

  const isSelected = selectedFurnitureIndex === index;

  const bind = useDrag(
    ({ delta: [dx, dz], active }) => {
      if (!isSelected) return;

      if (setControlsEnabled) setControlsEnabled(!active); // Disable controls during drag

      let [x, y, z] = position;

      x += dx / 50; 
      z -= dz / 50; 

      // Clamp to room boundaries
      x = Math.max(-roomWidth / 2 + scale / 2, Math.min(roomWidth / 2 - scale / 2, x));
      z = Math.max(-roomHeight / 2 + scale / 2, Math.min(roomHeight / 2 - scale / 2, z));

      updateFurniturePosition(index, [x, y, z]);
    },
    { pointerEvents: true } 
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isSelected) return;

      let [x, y, z] = position;
      let [rotX, rotY, rotZ] = rotation;

      switch (e.key) {
        case "ArrowLeft":
          if (x - 0.1 > -roomWidth / 2 + scale / 2) x -= 0.1;
          break;
        case "ArrowRight":
          if (x + 0.1 < roomWidth / 2 - scale / 2) x += 0.1;
          break;
        case "ArrowUp":
          if (z - 0.1 > -roomHeight / 2 + scale / 2) z -= 0.1;
          break;
        case "ArrowDown":
          if (z + 0.1 < roomHeight / 2 - scale / 2) z += 0.1;
          break;
        case "r":
          rotY += Math.PI / 16;
          break;
        case "l":
          rotY -= Math.PI / 16;
          break;
        default:
          return;
      }

      updateFurniturePosition(index, [x, y, z]);
      updateFurnitureRotation(index, [rotX, rotY, rotZ]);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [position, rotation, roomWidth, roomHeight, scale, index, isSelected]);

  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
      {...bind()} // Apply drag bindings
      onClick={(e) => {
        e.stopPropagation(); // Prevent click from bubbling up
        setSelectedFurnitureIndex(index);
      }}
    >
      <primitive
        object={
          useGLTF(modelPath).nodes[Object.keys(useGLTF(modelPath).nodes)[0]]
        }
      />
      {isSelected && (
        <mesh>
          <ringGeometry args={[scale, scale + 0.1, 32]} />
          <meshBasicMaterial color="blue" />
        </mesh>
      )}
    </mesh>
  );
};

export default Furniture;
