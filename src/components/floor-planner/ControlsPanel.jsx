import React from "react";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";
import { FaSave, FaDownload, FaCamera, FaFileExport } from "react-icons/fa";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Success!",
      text: "Your design has been saved locally!",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#4682B4",
    });
  };

  // Load design locally
  const handleLoadDesign = () => {
    const savedDesign = JSON.parse(localStorage.getItem("floorPlanDesign"));
    if (savedDesign) {
      setWidth(savedDesign.width);
      setHeight(savedDesign.height);
      setFurnitureItems(savedDesign.furnitureItems);
      Swal.fire({
        title: "Success!",
        text: "Your design has been loaded!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#4682B4",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "No saved design found!",
        icon: "error",
        confirmButtonText: "Retry",
        confirmButtonColor: "#4682B4",
      });
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
        Swal.fire({
          title: "Success!",
          text: "Your 3D model has been exported!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#4682B4",
        });
      },
      { binary: false }
    );
  };

  // Export as Image
  const handleExportImage = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "floor-plan.png";
      link.click();
      Swal.fire({
        title: "Success!",
        text: "Your design has been exported as an image!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#4682B4",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Failed to export the image. Canvas not found!",
        icon: "error",
        confirmButtonText: "Retry",
        confirmButtonColor: "#4682B4",
      });
    }
  };

  return (
    <div className="absolute bottom-5 right-5 flex flex-col gap-2">
      <button
        className="flex items-center gap-2 bg-steelBlue text-white py-2 px-4 rounded hover:bg-white hover:text-steelBlue hover:border hover:border-steelBlue"
        onClick={handleSaveDesign}
      >
        <FaSave /> Save Design
      </button>
      <button
        className="flex items-center gap-2 bg-steelBlue text-white py-2 px-4 rounded hover:bg-white hover:text-steelBlue hover:border hover:border-steelBlue"
        onClick={handleLoadDesign}
      >
        <FaDownload /> Load Design
      </button>
      <button
        className="flex items-center gap-2 bg-steelBlue text-white py-2 px-4 rounded hover:bg-white hover:text-steelBlue hover:border hover:border-steelBlue"
        onClick={handleExport3DModel}
      >
        <FaFileExport /> Export 3D Model
      </button>
      <button
        className="flex items-center gap-2 bg-steelBlue text-white py-2 px-4 rounded hover:bg-white hover:text-steelBlue hover:border hover:border-steelBlue"
        onClick={handleExportImage}
      >
        <FaCamera /> Export as Image
      </button>
    </div>
  );
};

export default ControlsPanel;
