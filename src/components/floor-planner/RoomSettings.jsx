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
      <div>
        <label htmlFor="">
          Width:
          <input type="text" />
        </label>
        <label htmlFor="">
          Height:
          <input type="text" />
        </label>

        <div>
          <label htmlFor="">
            Scale:
            <input type="text" />
          </label>
        </div>

        <button>Switch to</button>

        <button>Settings</button>
      </div>
    </>
  );
};

export default RoomSettings;
