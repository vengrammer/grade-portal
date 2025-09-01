import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
}

export const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
