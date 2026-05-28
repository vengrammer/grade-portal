import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BookOpenText, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";

const routes = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Enrollments", path: "/admin/enrollments" },
    { name: "Teacher Assignments", path: "/admin/teacherassignments" },
];

const school_data = [
    { name: "Grade Levels", path: "/admin/gradelevels" },
    { name: "Sections", path: "/admin/sections" },
    { name: "Subjects", path: "/admin/subjects" },
    { name: "School Year", path: "/admin/schoolyears" },
    { name: "Grading Periods", path: "/admin/gradingperiods" },
];

const accounts = [
    { name: "Teachers", path: "/admin/teachers" },
    { name: "Students", path: "/admin/students" },
    { name: "Admins", path: "/admin/admins" },
]

function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [openSchoolData, setOpenSchoolData] = useState(false);
    const [openAccounts, setOpenAccounts] = useState(false);

    function handleNavigate(path: string) {
        navigate(path);
    }

    function isActive(path: string) {
        return location.pathname === path;
    }

    return (
        <div className="flex flex-col h-screen w-full bg-gray-100">

            <header className="flex items-center justify-between px-6 py-3 bg-[#226bfc] text-white border-b-4 border-[#aefe02]">
                <div className="flex items-center gap-2">
                    <BookOpenText size={32} className="text-[#00ff08]" />
                    <span className="text-xl font-bold">Grade Portal</span>
                </div>
            </header>

            <div className="flex flex-1 min-h-0">
                <aside className="w-72 bg-[#226bfc] text-white flex flex-col p-4 gap-4">

                    <div className="border-b border-white/20 pb-3">
                        <p className="text-lg font-bold">Welcome Admin</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs uppercase text-white/60">Main</p>

                        {routes.map((r) => (
                            <button
                                key={r.name}
                                onClick={() => handleNavigate(r.path)}
                                className={`text-left px-3 py-2 rounded-lg transition ${isActive(r.path)
                                    ? "bg-white/20 border border-[#aefe02] font-semibold"
                                    : "hover:bg-white/10"
                                    }`}
                            >
                                {r.name}
                            </button>
                        ))}
                    </div>

                    {/* Accounts */}
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => setOpenAccounts(!openAccounts)}
                            className="flex items-center border-b justify-between px-3 py-2 rounded-lg hover:bg-white/10 transition"
                        >
                            <span className="text-xs uppercase text-white/60">
                                Accounts
                            </span>
                            <ChevronDown
                                size={18}
                                className={`transition ${openAccounts ? "rotate-180" : ""}`}
                            />
                        </button>

                        {openAccounts && (
                            <div className="flex flex-col gap-1 pl-2">
                                {accounts.map((s) => (
                                    <button
                                        key={s.name}
                                        onClick={() => handleNavigate(s.path)}
                                        className={`text-left px-3 py-2 rounded-lg text-sm transition ${isActive(s.path)
                                            ? "bg-white/20 border border-[#aefe02]"
                                            : "hover:bg-white/10"
                                            }`}
                                    >
                                        {s.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* School Data */}
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => setOpenSchoolData(!openSchoolData)}
                            className="flex items-center justify-between border-b px-3 py-2 rounded-lg hover:bg-white/10 transition"
                        >
                            <span className="text-xs uppercase text-white/60">
                                School Data
                            </span>
                            <ChevronDown
                                size={18}
                                className={`transition ${openSchoolData ? "rotate-180" : ""}`}
                            />
                        </button>

                        {openSchoolData && (
                            <div className="flex flex-col gap-1 pl-2">
                                {school_data.map((s) => (
                                    <button
                                        key={s.name}
                                        onClick={() => handleNavigate(s.path)}
                                        className={`text-left px-3 py-2 rounded-lg text-sm transition ${isActive(s.path)
                                            ? "bg-white/20 border border-[#aefe02]"
                                            : "hover:bg-white/10"
                                            }`}
                                    >
                                        {s.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-auto flex items-center justify-between p-3 rounded-xl bg-[#25048188] border border-white/10">
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                                Gerona Reven Amazonejjjjjjjjjjjj
                            </p>
                            <p className="text-xs text-[#02f3c7] font-bold">Admin</p>
                        </div>

                        <button className="text-white hover:scale-110 transition">
                            <LogOut size={22} />
                        </button>
                    </div>

                </aside>
                <main className="flex-1 min-h-0 flex bg-white overflow-hidden">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}

export default AdminLayout;