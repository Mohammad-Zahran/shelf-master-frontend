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

  return (
    <div>
        <div>
            <h2>2D Floor Plan</h2>
            <div>
                
            </div>
        </div>
    </div>
  );
};

export default TwoDView;
