import React from "react";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";

const Sidebar = () => {
  const {
    setAmbientLightIntensity,
    pointLightIntensity,
    setPointLightIntensity,
    pointLightPosition,
    setPointLightPosition,
  } = useFloorPlanner();
  
  return <div>Sidebar</div>;
};

export default Sidebar;
