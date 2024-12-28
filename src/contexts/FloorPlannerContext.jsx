import React, { createContext, useState, useContext } from "react";

const FloorPlannerContext = createContext();

export const useFloorPlanner = () => useContext(FloorPlannerContext);

export const FloorPlannerProvider = ({ children }) => {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
};

return (
  <FloorPlannerContext.Provider
    value={{
      width,
      setWidth,
      height,
      setHeight,
    }}
  >
    {children}
  </FloorPlannerContext.Provider>
);
