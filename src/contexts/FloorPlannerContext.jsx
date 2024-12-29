import React, { createContext, useState, useContext } from "react";

const FloorPlannerContext = createContext();

export const useFloorPlanner = () => useContext(FloorPlannerContext);

export const FloorPlannerProvider = ({ children }) => {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [scale, setScale] = useState(1.5);
  const [viewMode, setViewMode] = useState("3D");
  const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);
  const [pointLightIntensity, setPointLightIntensity] = useState(1);
  const [pointLightPosition, setPointLightPosition] = useState([10, 10, 10]);
  const [showSettings, setShowSettings] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFurnitureIndex, setSelectedFurnitureIndex] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#242424"); 
  const [wallHeight, setWallHeight] = useState(3); // Add wallHeight state



  const addFurniture = (modelPath) => {
    setFurnitureItems([
      ...furnitureItems,
      {
        modelPath,
        scale: 1.5, // Default scale
        position: [0, 0.5, 0], // Spawn at the center of the room
        rotation: [0, 0, 0], // Default rotation
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

  const deleteFurniture = (index) => {
    setFurnitureItems((prevItems) => prevItems.filter((_, i) => i !== index));
    setSelectedFurnitureIndex(null); // Clear selection after deletion
  };

  return (
    <FloorPlannerContext.Provider
      value={{
        width,
        setWidth,
        height,
        setHeight,
        furnitureItems,
        addFurniture,
        updateFurniturePosition,
        updateFurnitureRotation,
        scale,
        setScale,
        viewMode,
        setViewMode,
        ambientLightIntensity,
        setAmbientLightIntensity,
        pointLightIntensity,
        setPointLightIntensity,
        pointLightPosition,
        setPointLightPosition,
        showSettings,
        setShowSettings,
        showPopup,
        setShowPopup,
        selectedFurnitureIndex,
        setSelectedFurnitureIndex, 
        deleteFurniture,
        backgroundColor,
        setBackgroundColor, 
        wallHeight,
        setWallHeight, 
      }}
    >
      {children}
    </FloorPlannerContext.Provider>
  );
};
