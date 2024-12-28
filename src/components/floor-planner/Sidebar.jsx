import React from "react";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";
import logo from "../../../public/assets/images/logo.png";

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
    <div className="w-full md:w-72 bg-gray-100 p-5 shadow-lg flex flex-col items-center">
      <div className="flex justify-center mb-6 w-full">
        <a href="/">
          <img src={logo} alt="Logo" className="w-20 h-auto md:w-24" />
        </a>
      </div>

      <h2 className="text-base md:text-lg font-semibold mb-4 text-center text-black">
        Floor Planner
      </h2>

      {/* Settings Button */}
      <button
        className="w-full py-2 mb-4 bg-steelBlue text-white rounded-md hover:bg-transparent hover:text-steelBlue hover:border hover:border-steelBlue"
        onClick={() => setShowSettings(!showSettings)}
      >
        Settings
      </button>

      {/* Add Furniture Button */}
      <button
        className="w-full py-2 mb-4 bg-steelBlue text-white rounded-md hover:bg-transparent hover:text-steelBlue hover:border hover:border-steelBlue"
        onClick={() => setShowPopup(true)}
      >
        Add Furniture
      </button>

      {/* Delete Furniture Button */}
      <button
        className="w-full py-2 mb-4 bg-steelBlue text-white rounded-md hover:bg-transparent hover:text-steelBlue hover:border hover:border-steelBlue"
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
        className="w-full py-2 mb-4 bg-steelBlue text-white rounded-md hover:bg-transparent hover:text-steelBlue hover:border hover:border-steelBlue"
        onClick={() => setViewMode(viewMode === "3D" ? "2D" : "3D")}
      >
        Switch to {viewMode === "3D" ? "2D" : "3D"} View
      </button>

      {/* Background Color Picker */}
      <div className="mt-6 w-full">
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
      <div className="mt-6 w-full">
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
