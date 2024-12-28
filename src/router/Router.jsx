import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import FloorPlanner from "../pages/FloorPlanner/FloorPlanner";

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
  { path: "/floor-planner", element: <FloorPlanner /> },
]);

export default router;
