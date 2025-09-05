import { useState } from "react";
import { Outlet } from "react-router-dom";
function AdminAuthRoute(){

  const [auth, setAuth] = useState<boolean>(false);
  return (
    <>
    {auth && <Outlet/>}
    </>
  )
}
export default AdminAuthRoute;