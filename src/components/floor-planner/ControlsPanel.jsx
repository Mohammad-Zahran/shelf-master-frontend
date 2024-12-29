import React from "react";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";

const ControlsPanel = () => {
  const {
    width,
    height,
    furnitureItems,
    setWidth,
    setHeight,
    setFurnitureItems,
  } = useFloorPlanner();

  // Save design locally
  const handleSaveDesign = () => {
    const design = {
      width,
      height,
      furnitureItems,
    };
    localStorage.setItem("floorPlanDesign", JSON.stringify(design));
    alert("Design saved locally!");
  };

  // Load design locally
  const handleLoadDesign = () => {
    const savedDesign = JSON.parse(localStorage.getItem("floorPlanDesign"));
    if (savedDesign) {
      setWidth(savedDesign.width);
      setHeight(savedDesign.height);
      setFurnitureItems(savedDesign.furnitureItems);
      alert("Design loaded!");
    } else {
      alert("No saved design found!");
    }
  };

  // Export as 3D Model
  const handleExport3DModel = () => {
    const exporter = new GLTFExporter();
    exporter.parse(
      document.querySelector("canvas"),
      (gltf) => {
        const blob = new Blob([JSON.stringify(gltf)], {
          type: "application/json",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "floor-plan.gltf";
        link.click();
      },
      { binary: false }
    );
  };

  // Export as Image
  const handleExportImage = () => {
    const canvas = document.querySelector("canvas");
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "floor-plan.png";
    link.click();
  };

  return (
    <div className="absolute bottom-5 right-5 flex flex-col gap-2">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleSaveDesign}
      >
        Save Design
      </button>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded"
        onClick={handleLoadDesign}
      >
        Load Design
      </button>
      <button
        className="bg-purple-500 text-white py-2 px-4 rounded"
        onClick={handleExport3DModel}
      >
        Export 3D Model
      </button>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded"
        onClick={handleExportImage}
      >
        Export as Image
      </button>
    </div>
  );
};

export default ControlsPanel;
