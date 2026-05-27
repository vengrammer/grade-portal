
import { Outlet } from "react-router-dom";
import { BookOpenText } from "lucide-react";
import { LogOut } from "lucide-react";


import { useNavigate } from "react-router-dom";


const routes = [{
    name: "Dashboard",
    path: "/admin/dashboard"
},
{
    name: "Users",
    path: "/admin/users"
},

{
    name: "Teacher Assignments",
    path: "/admin/teacherassignments"
}, {
    name: "Students",
    path: "/admin/students"
},
{
    name: "Grade Levels",
    path: "/admin/gradelevels"
},
{
    name: "Sections",
    path: "/admin/sections"
},
{
    name: "Subjects",
    path: "/admin/subjects"
},
{
    name: "School Year",
    path: "/admin/schoolyears"
},
{
    name: "Teachers",
    path: "/admin/teachers"
}];

function AdminLayout() {

    const navigate = useNavigate();
    function handleNavigate(routes: string) {
        navigate(routes);
    }

    function isActive(path: string): boolean {
        return location.pathname.includes(path)
    }

    return (
        <div className="flex flex-col w-full h-screen">
            <header className="flex w-full p-2 bg-[#226bfc] text-white border-b-2 border-[#aefe02]">
                <div className="flex gap-2 items-center justify-center ">
                    <BookOpenText size={40} className="text-[#00ff0888]" />
                    <span className="text-2xl font-bold">Grade Portal</span>
                </div>
            </header>
            <div className="flex flex-1 min-h-0 w-full bg-gray-400">
                <aside className="flex flex-col h-full overflow-y-auto gap-2 w-70 p-4 bg-[#226bfc] text-white">
                    <div className="flex gap-2 items-center justify-center border-b-2 border-[#aefe02]">
                        <span className="text-2xl  font-bold">Welcome Admin</span>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 pt-10">
                        {routes.map((r) => {
                            return (
                                <button
                                    key={r.name}
                                    className={isActive(r.path) ?
                                        "bg-[#10078a88] text-white p-2 rounded-xl border border-[#aefe02] underline " :
                                        "bg-[#10078a88] text-white p-2 rounded-xl }"}
                                    onClick={() => handleNavigate(r.path)}>{r.name}</button>
                            )
                        })}
                    </div>
                    <div className="flex w-full justify-between border p-2 rounded-2xl bg-[#25048188]">
                        <div className="flex flex-col">
                            <p className="truncate w-50">Gerona Reven Amazonejjjjjjjjjjjjdddddddddd</p>
                            <p className="flex items-center justify-center text-[#02f3c7] font-bold">Admin</p>
                        </div>
                        <button className=" hover:scale-110 transform transition-all cursor-pointer text-[#e9e7e7] bg-[#f50a06] border font-extrabold px-2 rounded"><LogOut size={25} /></button>
                    </div>
                </aside>
                <main className="flex flex-1 min-h-0 overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
export default AdminLayout;