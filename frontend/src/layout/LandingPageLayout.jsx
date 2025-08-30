import { Button } from "@/components/ui/button";

import { Login } from "@/components/custom/login";
import { Outlet } from "react-router-dom";

function LandingPageLayout() {
  return (
    <div className="w-full min-h-screen">
      <Outlet />
    </div>
  );
}

export default LandingPageLayout;
