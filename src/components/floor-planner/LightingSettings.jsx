import React from "react";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";

const LightingSettings = () => {
  const {
    ambientLightIntensity,
    setAmbientLightIntensity,
    pointLightIntensity,
    setPointLightIntensity,
    pointLightPosition,
    setPointLightPosition,
  } = useFloorPlanner();

  return (
    <div>
      <h3 style={{ color: "black" }}>Lighting Settings</h3>
      <div>
        <label style={{ color: "black" }}>
          Ambient Light Intensity:
          <input style={{ marginLeft: "5px" }} />
          {ambientLightIntensity}
        </label>
      </div>

      <div>
        <label style={{ color: "black" }}>Point Light Intensity:</label>
        <input type="text" style={{ marginLeft: "5px" }} />
        {pointLightIntensity}
      </div>

      <div>
        <label style={{ color: "black" }}>
          Point Light Position X:
          <input style={{ marginLeft: "5px" }} />
        </label>
        <label style={{ color: "black" }}>
          Y:
          <input type="text" style={{ marginLeft: "5px" }} />
        </label>
        <label htmlFor="">
          Z:
          <input type="text" />
        </label>
      </div>
    </div>
  );
};

export default LightingSettings;
