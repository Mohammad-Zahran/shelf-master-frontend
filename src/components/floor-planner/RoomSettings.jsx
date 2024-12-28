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
            type="text"
            style={{ marginLeft: "5px", marginRight: "10px" }}
          />
        </label>

        <label style={{ color: "black" }}>
          Height:
          <input
            type="text"
            style={{ marginLeft: "5px", marginRight: "10px" }}
          />
        </label>

        <div style={{ marginTop: "10px" }}>
          <label style={{ marginLeft: "5px", marginRight: "10px" }}>
            Scale:
            <input type="text" />
          </label>
        </div>

        <button style={{ marginTop: "10px" }}>Switch to</button>

        <button style={{ marginTop: "10px", marginLeft: "10px" }}>
          Settings
        </button>
      </div>
    </>
  );
};

export default RoomSettings;
