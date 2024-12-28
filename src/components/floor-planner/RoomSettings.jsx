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
  return <div>RoomSettings</div>;
};

export default RoomSettings;
