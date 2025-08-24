import { createBrowserRouter } from "react-router-dom";

import LandingPageLayout from "./layout/LandingPageLayout";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./auth/RequireAuth";
import RequireRole from "./auth/RequireRole";

import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";

const router = createBrowserRouter([
  {
    element: <LandingPageLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "unauthorized", element: <Unauthorized /> },

      // Protected user route
      {
        element: <RequireAuth />,
        children: [
          {
            path: "user",
            element: <UserLayout />,
            children: [{ index: true, element: <UserDashboard /> }],
          },
        ],
      },

      // Protected admin route
      {
        element: <RequireRole />,
        children: [
          {
            path: "admin",
            element: <AdminLayout />,
            children: [{ index: true, element: <AdminDashboard /> }],
          },
        ],
      },
    ],
  },
]);
export default router;
