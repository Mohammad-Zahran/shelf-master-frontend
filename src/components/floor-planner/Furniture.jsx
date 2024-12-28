import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";

const Furniture = ({ modelPath, scale = 1, index, roomWidth, roomHeight }) => {
  const {
    furnitureItems,
    updateFurniturePosition,
    updateFurnitureRotation,
    selectedFurnitureIndex,
    setSelectedFurnitureIndex,
  } = useFloorPlanner();
  const { position, rotation } = furnitureItems[index];

  const isSelected = selectedFurnitureIndex;

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

  return <div>Furniture</div>;
};

export default Furniture;
