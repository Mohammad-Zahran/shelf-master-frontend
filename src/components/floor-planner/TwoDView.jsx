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

  // Helper function to generate grid lines and labels
  const generateGrid = () => {
    const gridLines = [];
    const cellSize = 50; // 1 meter = 50px
    const gridWidth = Math.min(width * cellSize, 800);
    const gridHeight = Math.min(height * cellSize, 600);

    // Vertical grid lines with labels
    for (let x = 0; x <= width; x++) {
      const position = x * cellSize;
      gridLines.push(
        <div
          key={`v-${x}`}
          className="absolute bg-gray-400"
          style={{
            left: `${position}px`,
            top: 0,
            width: "1px",
            height: `${gridHeight}px`,
          }}
        ></div>
      );
      gridLines.push(
        <div
          key={`v-label-${x}`}
          className="absolute text-xs text-black"
          style={{
            left: `${position - 10}px`,
            top: `${gridHeight + 5}px`,
          }}
        >
          {x}m
        </div>
      );
    }

    // Horizontal grid lines with labels
    for (let y = 0; y <= height; y++) {
      const position = y * cellSize;
      gridLines.push(
        <div
          key={`h-${y}`}
          className="absolute bg-gray-400"
          style={{
            top: `${position}px`,
            left: 0,
            height: "1px",
            width: `${gridWidth}px`,
          }}
        ></div>
      );
      gridLines.push(
        <div
          key={`h-label-${y}`}
          className="absolute text-xs text-black"
          style={{
            top: `${position - 10}px`,
            left: `${gridWidth + 5}px`,
          }}
        >
          {y}m
        </div>
      );
    }

    return gridLines;
  };

  return (
    <div className="w-full h-full relative bg-gray-200">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full overflow-auto">
        <h2 className="text-lg font-bold mb-4 text-center">2D Floor Plan</h2>
        <div
          className="relative bg-white border border-black"
          style={{
            width: `${Math.min(width * 50, 800)}px`,
            height: `${Math.min(height * 50, 600)}px`,
          }}
        >
          {/* Render Grid with Measurements */}
          {generateGrid()}

          {/* Render Furniture */}
          {furnitureItems.map((item, index) => {
            const model = shelveData.find(
              (s) => s.modelPath === item.modelPath
            );

            return (
              <div
                key={index}
                onClick={() => setSelectedFurnitureIndex(index)}
                className={`absolute transition-all duration-300 transform ${
                  selectedFurnitureIndex === index
                    ? "bg-blue-500 bg-opacity-50"
                    : "bg-black bg-opacity-50"
                }`}
                style={{
                  top: `${(item.position[2] + height / 2) * 50}px`,
                  left: `${(item.position[0] + width / 2) * 50}px`,
                  width: `${item.scale * 50}px`,
                  height: `${item.scale * 50}px`,
                }}
              >
                {selectedFurnitureIndex === index && (
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 px-2 py-1 rounded-md text-xs border border-black text-black">
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
