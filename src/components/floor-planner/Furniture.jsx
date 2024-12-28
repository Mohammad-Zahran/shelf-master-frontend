import React from "react";
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
  
  return <div>Furniture</div>;
};

export default Furniture;
