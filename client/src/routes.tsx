import { createBrowserRouter } from "react-router-dom";

// Layouts
import LandingLayoutPage from "./layouts/LandingLayoutPage";
import UserLayout from "./layouts/StudentLayout";
import AdminLayout from "./layouts/AdminLayout";

// Auth Guards
import AdminAuthRoute from "./auth/AdminAuthRoute";
import StudentAuthRoute from "./auth/StudentAuthRoute";

// Pages
import ErrorPage from "./components/ErroPage";
import AdminHomePage from "./Adminpages/AdminHomePage";
import UserHomePage from "./UserPages/UserHomePage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <div>Welcome to Grade Portal</div>,
      },
    ],
  },

  // Student Routes
  {
    path: "/student",
    element: <StudentAuthRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <UserLayout />,
        children: [
          {
            index: true,
            element: <UserHomePage />,
          },
          {
            path: "dashboard",
            element: <UserHomePage />,
          },
        ],
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: <AdminAuthRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminHomePage />,
          },
          {
            path: "dashboard",
            element: <AdminHomePage />,
          },
        ],
      },
    ],
  },
]);

export default routes;
