import { useState } from "react";
import { Outlet } from "react-router-dom";

function StudentAuthRoute(){
  const [auth, setAuth] = useState<boolean>(false);
  return (
    <>
    {auth && <Outlet/>}
    </>
  )
}
export default StudentAuthRoute;