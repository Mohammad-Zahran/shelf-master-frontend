import React, { createContext, useState, useContext } from "react";

const FloorPlannerContext = createContext();

export const useFloorPlanner = () => useContext(FloorPlannerContext);

export const FloorPlannerProvider = ({ children }) => {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [scale, setScale] = useState(1.5);
  const [viewMode, setViewMode] = useState("3D");
  const [showSettings, setShowSettings] = useState(false);
  const [selectedFurnitureIndex, setSelectedFurnitureIndex] = useState(null); // New state
  const [showPopup, setShowPopup] = useState(false);

  const addFurniture = (modelPath) => {
    setFurnitureItems([
      ...furnitureItems,
      {
        modelPath,
        scale: 1.5,
        position: [0, 0.5, 0],
        rotation: [0, 0, 0],
      },
    ]);
  };

  const updateFurniturePosition = (index, position) => {
    setFurnitureItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, position } : item))
    );
  };

  const updateFurnitureRotation = (index, rotation) => {
    setFurnitureItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, rotation } : item))
    );
  };

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
        selectedFurnitureIndex,
        setSelectedFurnitureIndex,
        showPopup,
        setShowPopup,
      }}
    >
      {children}
    </FloorPlannerContext.Provider>
  );
};
