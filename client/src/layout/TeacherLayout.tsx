
import { Outlet } from "react-router-dom";
import { BookOpenText,X,Menu } from "lucide-react";
import { LogOut } from "lucide-react";
import {useState} from "react"
function TeacherLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="flex flex-col w-full h-screen">
            <header className="flex justify-between w-full p-2 bg-[#226bfc] text-white border-b-2 border-[#aefe02]">
                <div className="flex gap-2 items-center justify-center ">
                    <BookOpenText size={40} className="text-[#00ff0888]" />
                    <span className="text-2xl font-bold whitespace-nowrap">Grade Portal</span>
                </div>
              <div className="flex items-center justify-end pr-4">
                <button onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
              </div>
            </header>
            <div className="flex  flex-1 w-full h-full bg-amber-400 min-h-0 ">
              {menuOpen && <aside className="flex absolute z-50 transform transition-transform duration-500 ease-in-out flex-col h-full gap-2 w-77 bg-[#226bfc] text-white overflow-scroll">
                    <div className="flex gap-2 p-2 items-center justify-center border-b-2 border-[#aefe02]">
                        <span className="text-2xl  font-bold">Welcome Teacher</span>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 pt-10 mx-2">
                        <button className="bg-[#10078a88] text-white p-2  rounded">Dashboard</button>
                        <button className="bg-[#10078a88] text-white p-2 rounded">My Classes</button>
                        <button className="bg-[#10078a88] text-white p-2 rounded">Encode Grades</button>
                        <button className="bg-[#10078a88] text-white p-2 rounded">Submitted Grades</button>
                    </div>
                    <div className="flex w-full justify-between border p-2 rounded-2xl bg-[#25048188] mb-15">
                        <div className="flex flex-col">
                            <p className="truncate w-50">Gerona Reven Amazonejjjjjjjjjjjjdddddddddd</p>
                            <p className="flex items-center justify-center text-[#02f3c7] font-bold">Teacher</p>
                        </div>
                        <button className=" hover:scale-110 transform transition-all cursor-pointer text-[#e9e7e7] bg-[#f50a06] border font-extrabold px-2 rounded"><LogOut size={25} /></button>
                    </div>
                </aside>}
                <main className="flex flex-1 h-full ">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
export default TeacherLayout;