import {Outlet} from "react-router-dom";
function AdminLayout(){
    return(
        <>
            <h1>adminlayout page</h1>
            <main>
                <Outlet/>
            </main>
        </>
    )
}
export default AdminLayout;