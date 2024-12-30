import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import FloorPlanner from "../pages/floor-planner/FloorPlanner";
import { FloorPlannerProvider } from "../contexts/FloorPlannerContext";
import Signup from "../components/Auth/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import Products from "../pages/shop/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/products",
        element: <Products />,
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
    element: <Signup />,
  },
]);

export default router;
