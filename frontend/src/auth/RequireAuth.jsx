import { Outlet,Navigate } from "react-router-dom";

function RequireAuth() {
  
  const auth = false;
  return <>{auth ? <Outlet /> : <Navigate to="/unauthorized" />  }</>;
}
export default RequireAuth;
