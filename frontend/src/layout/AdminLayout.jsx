import {Outlet} from "react-router-dom";
import { Navbar } from "@/components/custom/navbar";
import { Fragment } from "react";
function AdminLayout(){
    return(
        <Fragment>
            <div>
                <Navbar/>
            </div>
            <main>
                <Outlet/>
            </main>
        </Fragment>
    )
}
export default AdminLayout;