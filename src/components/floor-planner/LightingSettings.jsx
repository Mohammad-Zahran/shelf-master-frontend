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
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={ambientLightIntensity}
            onChange={(e) =>
              setAmbientLightIntensity(parseFloat(e.target.value))
            }
            style={{ marginLeft: "5px" }}
          />
          {ambientLightIntensity}
        </label>
      </div>

      <div>
        <label style={{ color: "black" }}>
          Point Light Intensity:
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={pointLightIntensity}
            onChange={(e) => setPointLightIntensity(parseFloat(e.target.value))}
            style={{ marginLeft: "5px" }}
          />
          {pointLightIntensity}
        </label>
      </div>

      <div>
        <label style={{ color: "black" }}>
          Point Light Position X:
          <input
            type="number"
            value={pointLightPosition[0]}
            onChange={(e) =>
              setPointLightPosition([
                parseFloat(e.target.value),
                pointLightPosition[1],
                pointLightPosition[2],
              ])
            }
            style={{ marginLeft: "5px" }}
          />
        </label>
        <label style={{ color: "black" }}>
          Y:
          <input
            type="number"
            value={pointLightPosition[1]}
            onChange={(e) =>
              setPointLightPosition([
                pointLightPosition[0],
                parseFloat(e.target.value),
                pointLightPosition[2],
              ])
            }
            style={{ marginLeft: "5px" }}
          />
        </label>
        <label style={{ color: "black" }}>
          Z:
          <input
            type="number"
            value={pointLightPosition[2]}
            onChange={(e) =>
              setPointLightPosition([
                pointLightPosition[0],
                pointLightPosition[1],
                parseFloat(e.target.value),
              ])
            }
            style={{ marginLeft: "5px" }}
          />
        </label>
      </div>
    </div>
  );
};

export default LightingSettings;
