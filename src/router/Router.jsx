import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import FloorPlanner from "../pages/floor-planner/FloorPlanner";
import { FloorPlannerProvider } from "../contexts/FloorPlannerContext";
import Signup from "../components/Auth/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import Products from "../pages/shop/Products";
import PrivateRouter from "./../PrivateRouter/PrivateRouter";
import CartPage from "../pages/shop/CartPage";
import WishListPage from "../pages/shop/WishListPage";
import DashboardLayout from "./../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import Login from "../components/Auth/Login";
import AddProduct from "../pages/dashboard/admin/AddProduct";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";

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
      {
        path: "/cart-page",
        element: (
          <PrivateRouter>
            <CartPage />
          </PrivateRouter>
        ),
      },
      {
        path: "/wishlist-page",
        element: (
          <PrivateRouter>
            <WishListPage />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/floor-planner",
    element: (
      <PrivateRouter>
        <FloorPlannerProvider>
          <FloorPlanner />
        </FloorPlannerProvider>
      </PrivateRouter>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-product",
        element: <AddProduct />
      },
      {
        path: "manage-items",
        element: <ManageItems />
      },
      {
        path: "update-menu/:id",
        element: <UpdateMenu />
      }
    ],
  },
]);

export default router;
