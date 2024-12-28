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

  return (
    showPopup && (
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
          width: "80%",
          maxWidth: "1000px",
          maxHeight: "80%",
          overflowY: "auto",
        }}
      >
        <button
          onClick={() => setShowPopup(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            fontSize: "20px",
            width: "30px",
            height: "30px",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        <h2 style={{ color: "black", textAlign: "center" }}>
          Select Furniture
        </h2>

        {/* Display models in a grid layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {furnitureModels.map((furniture, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                padding: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onClick={() => handleAddFurniture(furniture.modelPath)}
            >
              {/* Show image preview or placeholder */}
              <div
                style={{
                  width: "100%",
                  height: "100px",
                  backgroundColor: "#ddd",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {furniture.previewImagePath ? (
                  <img
                    src={furniture.previewImagePath}
                    alt={furniture.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span style={{ color: "gray" }}>No Image</span>
                )}
              </div>
              {/* Furniture name */}
              <p
                style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}
              >
                {furniture.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default FurniturePopup;
