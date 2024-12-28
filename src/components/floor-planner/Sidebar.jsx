import React from "react";

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

      {/* Settings Button */}
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
        onClick={() => setShowSettings(!showSettings)}
      >
        Settings
      </button>

      {/* Add Furniture Button */}
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
        onClick={() => setShowPopup(true)}
      >
        Add Furniture
      </button>

      {/* Delete Furniture Button */}
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
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#ffc107",
          color: "#000",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => setViewMode(viewMode === "3D" ? "2D" : "3D")}
      >
        Switch to {viewMode === "3D" ? "2D" : "3D"} View
      </button>

      {/* Room Dimension Controls */}
      <div style={{ marginTop: "20px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", color: "black" }}
        >
          Room Width: {width}m
        </label>
        <input
          type="range"
          min="5"
          max="50"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <label
          style={{ display: "block", marginBottom: "5px", color: "black" }}
        >
          Room Height: {height}m
        </label>
        <input
          type="range"
          min="5"
          max="50"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
