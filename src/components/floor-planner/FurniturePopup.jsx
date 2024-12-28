import React, { useEffect, useState } from "react";
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

  const handleAddFurniture = (modelPath) => {
    addFurniture(modelPath); 
    setShowPopup(false); 
  };


  return <div>FurniturePopup</div>;
};

export default FurniturePopup;
