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
  } = useFloorPlanner();
  return (
    <div>
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
      <div style={{ flex: 1, position: "relative" }}>
        {/* Render Settings Panel */}
        {showSettings && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              zIndex: 20,
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              maxWidth: "300px",
            }}
          >
            <button
              style={{
                background: "none",
                border: "none",
                fontSize: "18px",
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
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
  <Canvas style={{ width: "100%", height: "100%" }}>
    <ambientLight intensity={ambientLightIntensity} />
    <pointLight
      intensity={pointLightIntensity}
      position={pointLightPosition}
    />
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
    </div>
  );
};

export default FloorPlanner;
