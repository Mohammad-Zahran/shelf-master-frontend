import React, { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import gsap from "gsap";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";

const FurniturePopup = () => {
  const { showPopup, setShowPopup, addFurniture } = useFloorPlanner();
  const [furnitureModels, setFurnitureModels] = useState([]);

  // Fetch models dynamically from shelve.json
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("/shelve.json");
        const data = await response.json();
        setFurnitureModels(data);
      } catch (error) {
        console.error("Error loading furniture models:", error);
      }
    };

    fetchModels();
  }, []);

  const handleClosePopup = () => {
    gsap.to(".popup", {
      opacity: 0,
      y: -50,
      duration: 0.3,
      onComplete: () => setShowPopup(false),
    });
  };

  const handlePopupEnter = () => {
    gsap.fromTo(
      ".popup",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  };

  const handleAddFurniture = (modelPath) => {
    addFurniture(modelPath);
    setShowPopup(false);
  };

  useEffect(() => {
    if (showPopup) {
      handlePopupEnter();
    }
  }, [showPopup]);

  return (
    showPopup && (
      <div
        className="popup fixed top-10 left-1/2 transform -translate-x-1/2 z-20 bg-white p-6 rounded-md shadow-lg w-4/5 max-w-2xl max-h-[80%] overflow-y-auto"
      >
        <button
          onClick={handleClosePopup}
          className="absolute top-3 right-3 text-steelBlue text-3xl cursor-pointer"
        >
          <RxCrossCircled />
        </button>

        <h2 className="text-center text-black text-lg font-bold">Select Furniture</h2>

        {/* Display models in a grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {furnitureModels.map((furniture, index) => (
            <div
              key={index}
              className="text-center bg-gray-100 rounded-md p-4 shadow-md cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => handleAddFurniture(furniture.modelPath)}
            >
              {/* Show image preview or placeholder */}
              <div className="w-full h-24 bg-gray-300 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                {furniture.previewImagePath ? (
                  <img
                    src={furniture.previewImagePath}
                    alt={furniture.name}
                    className="max-w-full max-h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              {/* Furniture name */}
              <p className="text-sm font-semibold text-black">{furniture.name}</p>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default FurniturePopup;
