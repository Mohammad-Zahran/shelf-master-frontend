import React from "react";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";
const FurnitureControls = () => {
  const { showPopup, setShowPopup } = useFloorPlanner(); // Get showPopup and setShowPopup from context

  return (
    <div>
      <button
        onClick={() => setShowPopup(true)}
        style={{ marginBottom: "10px" }}
      >
        Add Furniture
      </button>

      {/* You can also add other buttons or controls for your UI here */}
    </div>
  );
};

export default FurnitureControls;
