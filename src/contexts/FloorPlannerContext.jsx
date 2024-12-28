import React, { createContext, useState, useContext } from "react";

const FloorPlannerContext = createContext();

export const useFloorPlanner = () => useContext(FloorPlannerContext);

export const FloorPlannerProvider = ({ children }) => {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [scale, setScale] = useState(1.5);
  const [viewMode, setViewMode] = useState("3D");
  const [showSettings, setShowSettings] = useState(false);

  return (
    <FloorPlannerContext.Provider
      value={{
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
      }}
    >
      {children}
    </FloorPlannerContext.Provider>
  );
};
