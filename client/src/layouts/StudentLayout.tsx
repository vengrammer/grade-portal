import { Outlet } from "react-router-dom";

function StudentLayout(){
    return(
        <>
            <h1>StudentLayout</h1>

            <main>
                <Outlet/>
            </main>
        </>
    )
}
export default StudentLayout;