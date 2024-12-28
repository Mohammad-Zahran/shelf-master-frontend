import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Room from "../../components/floor-planner/Room";
import Furniture from "../../components/floor-planner/Furniture";
import { useFloorPlanner } from "../../contexts/FloorPlannerContext";
import LightingSettings from "../../components/floor-planner/LightingSettings";
import FurniturePopup from "../../components/floor-planner/FurniturePopup";
import TwoDView from "../../components/floor-planner/TwoDView";
import Sidebar from "../../components/floor-planner/Sidebar";

const FloorPlanner = () => {
  return (
    <div>FloorPlanner</div>
  )
}

export default FloorPlanner