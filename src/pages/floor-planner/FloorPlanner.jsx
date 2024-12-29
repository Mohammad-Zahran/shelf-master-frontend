import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Room from "../../components/floor-planner/Room";
import Furniture from "../../components/floor-planner/Furniture";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";
import LightingSettings from "../../components/floor-planner/LightingSettings";
import FurniturePopup from "../../components/floor-planner/FurniturePopup";
import TwoDView from "../../components/floor-planner/TwoDView";
import Sidebar from "../../components/floor-planner/Sidebar";
import ControlsPanel from "../../components/floor-planner/ControlsPanel";

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
    wallHeight, 
    setWallHeight, 
  } = useFloorPlanner();

  const [controlsEnabled, setControlsEnabled] = useState(true);

  return (
    <div className="flex w-full h-screen" style={{ backgroundColor }}>
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

      <div className="flex-1 relative">
        {showSettings && (
          <div className="absolute top-5 left-5 z-20 bg-white p-5 rounded-md shadow-lg max-w-xs">
            <button
              className="absolute top-2 right-2 text-lg cursor-pointer"
              onClick={() => setShowSettings(false)}
            >
              &times;
            </button>
            <LightingSettings />
            {/* Wall Height Settings */}
            <div className="mt-4">
              <label className="block text-black font-medium mb-2">
                Wall Height:
              </label>
              <input
                type="number"
                value={wallHeight}
                onChange={(e) => setWallHeight(Number(e.target.value))}
                className="w-full border rounded-md px-2 py-1"
                min="1"
                max="10"
              />
            </div>
          </div>
        )}

        <FurniturePopup />

        {viewMode === "3D" && (
          <Canvas
            className="w-full h-full"
            camera={{
              position: [15, 10, 15], // Set the spawn point here (x, y, z)
              fov: 50, // Field of view
            }}
          >
            <ambientLight intensity={ambientLightIntensity} />
            <pointLight
              intensity={pointLightIntensity}
              position={pointLightPosition}
            />
            <OrbitControls enabled={controlsEnabled} />
            <Room width={width} height={height} wallHeight={wallHeight} />
            {furnitureItems.map((item, index) => (
              <Furniture
                key={index}
                modelPath={item.modelPath}
                scale={item.scale}
                index={index}
                roomWidth={width}
                roomHeight={height}
                setControlsEnabled={setControlsEnabled}
              />
            ))}
          </Canvas>
        )}

        {viewMode === "2D" && (
          <TwoDView
            width={width}
            height={height}
            furnitureItems={furnitureItems}
            selectedFurnitureIndex={selectedFurnitureIndex}
            setSelectedFurnitureIndex={setSelectedFurnitureIndex}
          />
        )}

        {/* Render the ControlsPanel */}
        <ControlsPanel />
      </div>
    </div>
  );
};

export default FloorPlanner;
