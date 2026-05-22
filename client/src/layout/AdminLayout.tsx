
import { Outlet } from "react-router-dom";
import { BookOpenText } from "lucide-react";
import { LogOut } from "lucide-react";
function AdminLayout() {
    return (
        <div className="flex flex-col w-full h-screen">
            <header className="flex  w-full p-2 bg-[#226bfc] text-white border-b-2 border-[#aefe02]">
                <div className="flex gap-2 items-center justify-center ">
                    <BookOpenText size={40} className="text-[#00ff0888]" />
                    <span className="text-2xl font-bold">Grade Portal</span>
                </div>
            </header>
            <div className="flex  flex-1 w-full h-ful bg-amber-400">
                <aside className="flex flex-col h-full gap-2 w-77 p-4 bg-[#226bfc] text-white">
                    <div className="flex gap-2 items-center justify-center border-b-2 border-[#aefe02]">
                        <span className="text-2xl  font-bold">Welcome Admin</span>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 pt-10">
                        <button className="bg-[#10078a88] text-white p-2 rounded">Dashboard</button>
                        <button className="bg-[#10078a88] text-white p-2 rounded">Users</button>
                        <button className="bg-[#10078a88] text-white p-2 rounded">Grade Levels</button>
                        <button className="bg-[#10078a88] text-white p-2 rounded">Sections</button>
                        <button className="bg-[#10078a88] text-white p-2 rounded">Subjects</button>
                        <button className="bg-[#10078a88] text-white p-2 rounded">Teacher Assignments</button>
                        <button className="bg-[#10078a88] text-white p-2 rounded">Students</button>
                        <button className="bg-[#10078a88] text-white p-2 rounded">School Year</button>
                    </div>
                    <div className="flex w-full justify-between border p-2 rounded-2xl bg-[#25048188]">
                        <div className="flex flex-col">
                            <p className="truncate w-50">Gerona Reven Amazonejjjjjjjjjjjjdddddddddd</p>
                            <p className="flex items-center justify-center text-[#02f3c7] font-bold">Admin</p>
                        </div>
                        <button className=" hover:scale-110 transform transition-all cursor-pointer text-[#e9e7e7] bg-[#f50a06] border font-extrabold px-2 rounded"><LogOut size={25} /></button>
                    </div>
                </aside>
                <main className="flex flex-1 h-full ">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
export default AdminLayout;