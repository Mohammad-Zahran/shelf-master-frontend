import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Room from "../../components/floor-planner/Room";
import Furniture from "../../components/floor-planner/Furniture";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";
import LightingSettings from "../../components/floor-planner/LightingSettings";
import FurniturePopup from "../../components/floor-planner/FurniturePopup";
import TwoDView from "../../components/floor-planner/TwoDView";
import Sidebar from "../../components/floor-planner/Sidebar";

const FloorPlanner = () => {
  const {
    viewMode,
    setViewMode,
    furnitureItems,
    setShowPopup,
    width,
    setWidth,
    height,
    setHeight,
    ambientLightIntensity,
    pointLightIntensity,
    pointLightPosition,
    showSettings,
    setShowSettings,
    selectedFurnitureIndex,
    setSelectedFurnitureIndex,
    deleteFurniture,
    backgroundColor,
  } = useFloorPlanner();

  return (
    <div className={`flex w-full h-screen`} style={{ backgroundColor }}>
      {/* Sidebar */}
      <Sidebar
        viewMode={viewMode}
        setViewMode={setViewMode}
        setShowPopup={setShowPopup}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        selectedFurnitureIndex={selectedFurnitureIndex}
        deleteFurniture={deleteFurniture}
      />

      {/* Main View Area */}
      <div className="flex-1 relative">
        {/* Render Settings Panel */}
        {showSettings && (
          <div className="absolute top-5 left-5 z-20 bg-white p-5 rounded-md shadow-lg max-w-xs">
            <button
              className="absolute top-2 right-2 text-lg cursor-pointer"
              onClick={() => setShowSettings(false)}
            >
              &times;
            </button>
            <LightingSettings />
          </div>
        )}

        {/* Render Furniture Popup */}
        <FurniturePopup />

        {/* 3D View */}
        {viewMode === "3D" && (
          <Canvas className="w-full h-full">
            <ambientLight intensity={ambientLightIntensity} />
            <pointLight intensity={pointLightIntensity} position={pointLightPosition} />
            <OrbitControls />
            <Room width={width} height={height} />
            {furnitureItems.map((item, index) => (
              <Furniture
                key={index}
                modelPath={item.modelPath}
                scale={item.scale}
                index={index}
                roomWidth={width}
                roomHeight={height}
              />
            ))}
          </Canvas>
        )}

        {/* 2D View */}
        {viewMode === "2D" && (
          <TwoDView
            width={width}
            height={height}
            furnitureItems={furnitureItems}
            selectedFurnitureIndex={selectedFurnitureIndex}
            setSelectedFurnitureIndex={setSelectedFurnitureIndex}
          />
        )}
      </div>
    </div>
  );
};

export default FloorPlanner;
