import { Outlet, Navigate } from "react-router-dom";

function RequireRole() {
  const roleAdmin = false;
  return <>{roleAdmin ? <Outlet /> : <Navigate to="/unauthorized"/>  }</>;
}
export default RequireRole;
