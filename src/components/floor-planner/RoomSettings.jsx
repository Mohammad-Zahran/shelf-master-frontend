import React from "react";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";

const RoomSettings = () => {
  const {
    width,
    setWidth,
    height,
    setHeight,
    scale,
    setScale,
    viewMode,
    setViewMode,
    showSettings,
    setShowSettings,
  } = useFloorPlanner();

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <label style={{ color: "black" }}>
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            style={{ marginLeft: "5px", marginRight: "10px" }}
          />
        </label>

        <label style={{ color: "black" }}>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            style={{ marginLeft: "5px", marginRight: "10px" }}
          />
        </label>

        <div style={{ marginTop: "10px" }}>
          <label style={{ color: "black" }}>
            Scale:
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              style={{ marginLeft: "5px", marginRight: "10px" }}
            />
            {scale}
          </label>
        </div>

        <button
          onClick={() => setViewMode(viewMode === "3D" ? "2D" : "3D")}
          style={{ marginTop: "10px" }}
        >
          Switch to {viewMode === "3D" ? "2D" : "3D"} View
        </button>

        <button
          onClick={() => setShowSettings(!showSettings)}
          style={{ marginTop: "10px", marginLeft: "10px" }}
        >
          Settings
        </button>
      </div>
    </>
  );
};

export default RoomSettings;
