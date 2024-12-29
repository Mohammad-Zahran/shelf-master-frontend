import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import FloorPlanner from "../pages/floor-planner/FloorPlanner";
import { FloorPlannerProvider } from "../contexts/FloorPlannerContext";
import Signup from "../components/Auth/Signup";

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
  {
    path: "/signup",
    element: <Signup />
  }
]);

export default router;
