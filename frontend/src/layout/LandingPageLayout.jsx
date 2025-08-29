import { Button } from "@/components/ui/button";

import { Login } from "@/components/custom/login";

function LandingPageLayout() {
  return (
    <div className="w-full min-h-screen">
      <div className="mx-7 md:w-150 md:h-150 my-10 md:mx-auto md:pt-auto align-items-center md:py-50 bg-zinc-200 p-10 ">
        <span className="text-3xl">
          Welcome to the{" "}
          <span className="text-red-500">Tiniguiban Rural High School</span>{" "}
          Online Grade Portal. Sign in to check your grades and stay connected
          with your progress.
        </span>
        <div className="p-auto">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default LandingPageLayout;
