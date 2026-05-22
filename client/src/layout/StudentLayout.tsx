import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowRight, BookOpenText } from "lucide-react";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { X } from "lucide-react";


function StudentLayout() {
    const location = useLocation();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 768);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    function isActive(path: string): boolean {
        return location.pathname.includes(path)
    }

    const routes = [
        { path: "/student/profile", name: "Profile" },
        { path: "/student/grade", name: "Grade" },
        { path: "/student/message", name: "Message" },
    ];

    function MobileModal() {

        return (
            <div className="flex absolute z-10 justify-center items-center  self-end rounded border  bg-gray-300 mt-17 mr-4 ">
                <div className="flex flex-col px-5  py-4  rounded gap-2">
                    {routes.map((route) => <Link key={route.name} to={route.path} className=" text-[#02087b] px-4 hover:bg-[#0bebff] rounded">{route.name}</Link>)}
                    <button className="bg-[#ff0808] text-white flex gap-2 justify-center items-center rounded hover:bg-[#88001b] cursor-pointer">Log out <ArrowRight size={20} /></button>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen w-full flex flex-col">
            <header className={`} flex  w-full p-2 bg-[#226bfc] text-white ${isMobile ? "justify-between" : ""}`}>
                <div className="flex gap-2 items-center justify-center ">
                    <BookOpenText size={40} className="text-[#00ff0888]" />
                    <span className="text-2xl font-bold">Grade Portal</span>
                </div>
                {isMobile ? (mobileOpen ? <X size={40} className="text-[#00ff0888] cursor-pointer " onClick={() => setMobileOpen(false)} /> : <Menu size={40} className="text-[#00ff0888] cursor-pointer" onClick={() => setMobileOpen(true)} />) :
                    (<div className="flex flex-1 items-center justify-center ">
                        <ul className="flex gap-20 text-xl">
                            {routes.map((route) => <li>
                                <Link key={route.name} to={route.path} className="hover:text-[#41d203]">
                                    <span className={`${isActive(route.path) ? " underline underline-offset-4" : ""}`}>{route.name}</span>
                                </Link>
                            </li>)}
                            <li>
                                <button className="bg-[#bc0609] hover:bg-[#e80e12] cursor-pointer px-4 rounded">
                                    <span className="flex gap-2 justify-center items-center">Logout <ArrowRight /></span>
                                </button>
                            </li>
                        </ul>
                    </div>)}
            </header>
            <main className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 flex flex-col min-h-0 border-2">
                    <Outlet />
                </div>
            </main>
            {(isMobile && mobileOpen) && <MobileModal />}
        </div>
    );
}

export default StudentLayout;