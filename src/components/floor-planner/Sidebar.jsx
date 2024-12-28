import React from "react";

const Sidebar = (
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
  deleteFurniture
) => {
  return (
    <div>
      <h2>Floor Planner</h2>

      <button>Settings</button>

      <button>Add Furniure</button>

      <button>Delete Selected Furniture</button>

      <button>Switch to {viewMode === "3D" ? "2D" : "3D"} View</button>

      <div>
        <label htmlFor="">Room Width: {width}m</label>
        <input type="text" />
        <label htmlFor="">Room Height: {height}m</label>
      </div>
    </div>
  );
};

export default Sidebar;
