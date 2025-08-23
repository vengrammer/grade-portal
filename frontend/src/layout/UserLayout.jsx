import {Outlet} from "react-router-dom";
function UserLayout(){
    return(
        <>
            <h1>User layout</h1>
             <main>
                <Outlet/>
            </main>
        </>
    )
}
export default UserLayout;