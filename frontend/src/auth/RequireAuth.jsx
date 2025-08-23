import { Outlet,Navigate } from "react-router-dom";

function RequireAuth() {
  
  const auth = true;
  return <>{auth ? <Outlet /> : <Navigate to="/unauthorized" />  }</>;
}
export default RequireAuth;
