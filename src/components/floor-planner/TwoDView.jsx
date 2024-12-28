import React from "react";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";
import shelveData from "../../../public/shelve.json";

const TwoDView = () => {
  const {
    width,
    height,
    furnitureItems,
    selectedFurnitureIndex,
    setSelectedFurnitureIndex,
  } = useFloorPlanner();
  
  return <div>TwoDView</div>;
};

export default TwoDView;
