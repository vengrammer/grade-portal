import { Outlet } from "react-router-dom";

export const LandingLayoutPage = () => {
  return (
    <div>
      <header>
        {/* Add your header/navigation here */}
        <nav>{/* Add your navigation links here */}</nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>{/* Add your footer content here */}</footer>
    </div>
  );
};
