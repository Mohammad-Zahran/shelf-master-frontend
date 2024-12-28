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
    <div
      style={{
        width: "300px",
        backgroundColor: "#f8f9fa",
        padding: "20px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          marginBottom: "15px",
          textAlign: "center",
          color: "black",
        }}
      >
        Floor Planner
      </h2>

      <button
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Settings
      </button>

      <button
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Furniure
      </button>

      <button
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete Selected Furniture
      </button>

      <button
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#ffc107",
          color: "#000",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Switch to {viewMode === "3D" ? "2D" : "3D"} View
      </button>

      <div>
        <label htmlFor="">Room Width: {width}m</label>
        <input type="text" />
        <label htmlFor="">Room Height: {height}m</label>
      </div>
    </div>
  );
};

export default Sidebar;
