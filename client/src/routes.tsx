import { createBrowserRouter } from "react-router-dom";

//layout
import AdminLayoutPage from "./layouts/AdminLayout";
import UserLayoutPage from "./layouts/UserLayout";
import LandingLayoutPage from "./layouts/LandingPageLayout";

//components
import ErrorPage from "./components/ErroPage";
import Login from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

const routes = createBrowserRouter([
  {
    element: <LandingLayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute
            isAllowed={localStorage.getItem("role") === "admin"}
          />
        ),
        children: [
          {
            element: <AdminLayoutPage />,
            children: [
              {
                index: true,
                element: <div>Admin Dashboard</div>,
              },
            ],
          },
        ],
      },
      {
        path: "user",
        element: <ProtectedRoute isAllowed={!!localStorage.getItem("token")} />,
        children: [
          {
            element: <UserLayoutPage />,
            children: [
              {
                index: true,
                element: <div>User Dashboard</div>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default routes;
