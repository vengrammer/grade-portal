import { Outlet } from "react-router-dom";

function LandingLayoutPage(){
  return (
    <div>
      <header>
        <nav>This is the landing page</nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
};
export default LandingLayoutPage;