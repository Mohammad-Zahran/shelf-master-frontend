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
      <h3>Lighting Settings</h3>
      <div>
        <label htmlFor="">
          Ambient Light Intensity:
          <input type="text" />
          {ambientLightIntensity}
        </label>
      </div>

      <div>
        <label htmlFor="">Point Light Intensity:</label>
        <input type="text" />
        {pointLightIntensity}
      </div>

      <div>
        <label htmlFor="">
            Point Light Position X:
            <input type="text" />
        </label>
        <label htmlFor="">
            Y:
            <input type="text" />
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
