import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import FloorPlanner from "../pages/floor-planner/FloorPlanner";
import { FloorPlannerProvider } from "../contexts/FloorPlannerContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/floor-planner",
    element: (
      <FloorPlannerProvider>
        <FloorPlanner />
      </FloorPlannerProvider>
    ),
  },
]);

export default router;
