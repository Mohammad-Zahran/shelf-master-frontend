import React from "react";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";

const RoomSettings = () => {
  const {
    width,
    setWidth,
    height,
    setHeight,
    wallHeight,
    setWallHeight, // Add wallHeight control
  } = useFloorPlanner();

  return (
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
      <label>
        Width:
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </label>
      <label>
        Height:
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </label>
      <label>
        Wall Height:
        <input
          type="number"
          value={wallHeight}
          onChange={(e) => setWallHeight(Number(e.target.value))}
          style={{ marginLeft: "5px", marginRight: "10px" }}
        />
      </label>
    </div>
  );
};

export default RoomSettings;
