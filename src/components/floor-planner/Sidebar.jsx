import React from "react";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";

const Sidebar = ({
  viewMode,
  setViewMode,
  setShowPopup,
  showSettings,
  setShowSettings,
  width,
  setWidth,
  height,
  setHeight,
  selectedFurnitureIndex,
  deleteFurniture,
}) => {
  const { backgroundColor, setBackgroundColor } = useFloorPlanner();

  return (
    <div className="w-72 bg-gray-100 p-5 shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-center text-black">
        Floor Planner
      </h2>

      {/* Settings Button */}
      <button
        className="w-full py-2 mb-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={() => setShowSettings(!showSettings)}
      >
        Settings
      </button>

      {/* Add Furniture Button */}
      <button
        className="w-full py-2 mb-4 bg-green-600 text-white rounded-md hover:bg-green-700"
        onClick={() => setShowPopup(true)}
      >
        Add Furniture
      </button>

      {/* Delete Furniture Button */}
      <button
        className="w-full py-2 mb-4 bg-red-600 text-white rounded-md hover:bg-red-700"
        onClick={() => {
          if (selectedFurnitureIndex !== null) {
            deleteFurniture(selectedFurnitureIndex);
          } else {
            alert("No furniture selected!");
          }
        }}
      >
        Delete Selected Furniture
      </button>

      {/* Switch View Mode Button */}
      <button
        className="w-full py-2 mb-4 bg-yellow-500 text-black rounded-md hover:bg-yellow-600"
        onClick={() => setViewMode(viewMode === "3D" ? "2D" : "3D")}
      >
        Switch to {viewMode === "3D" ? "2D" : "3D"} View
      </button>

      {/* Background Color Picker */}
      <div className="mt-6">
        <label className="block mb-2 text-black font-medium">
          Background Color:
        </label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="w-full h-10 rounded-md border-none cursor-pointer"
        />
      </div>

      {/* Room Dimension Controls */}
      <div className="mt-6">
        <label className="block mb-2 text-black font-medium">
          Room Width: {width}m
        </label>
        <input
          type="range"
          min="5"
          max="50"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-full mb-4"
        />

        <label className="block mb-2 text-black font-medium">
          Room Height: {height}m
        </label>
        <input
          type="range"
          min="5"
          max="50"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Sidebar;
