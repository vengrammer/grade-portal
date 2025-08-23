import {Outlet} from "react-router-dom";
function LandingPageLayout(){
    return(
        <>
            <h1>Landing page</h1>
            <main>
                <Outlet/>
            </main>
        </>
    )
}
export default LandingPageLayout;