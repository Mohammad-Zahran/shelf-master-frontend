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
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "lightgray",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h2>2D Floor Plan</h2>
        <div
          style={{
            width: `${width * 50}px`,
            height: `${height * 50}px`,
            backgroundColor: "white",
            border: "1px solid black",
            position: "relative",
          }}
        >
          {furnitureItems.map((item, index) => {
            // Match the item name with the model name from shelveData
            const model = shelveData.find(
              (s) => s.modelPath === item.modelPath
            );

            return (
              <div
                key={index}
                onClick={() => setSelectedFurnitureIndex(index)}
                style={{
                  position: "absolute",
                  top: `${(item.position[2] + height / 2) * 50}px`,
                  left: `${(item.position[0] + width / 2) * 50}px`,
                  width: `${item.scale * 50}px`,
                  height: `${item.scale * 50}px`,
                  backgroundColor:
                    selectedFurnitureIndex === index
                      ? "rgba(0, 0, 255, 0.5)"
                      : "rgba(0, 0, 0, 0.5)",
                }}
              >
                {selectedFurnitureIndex === index && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      padding: "2px 5px",
                      borderRadius: "3px",
                      fontSize: "12px",
                      border: "1px solid black",
                      color: "black",
                    }}
                  >
                    {model ? model.name : "Unknown"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TwoDView;
