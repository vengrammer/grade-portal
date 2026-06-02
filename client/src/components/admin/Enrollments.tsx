import { CalendarSearch, Filter, Plus, Search, Trash2, UserPlus, UsersRound } from "lucide-react";

import EnrollStudentsModal from "../modal/EnrollStudentsModal";
import { useState } from "react";


const colors: string[] = [
    "#f43f5e",
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#a855f7",
    "#06b6d4",
    "#ef4444",
    "#14b8a6",
    "#eab308",
    "#6366f1",
];

type SchoolItem = {
    schoolYear: string;
    enrolled_first_sem: number;
    enrolled_second_sem: number;
    sections: number;
};

const data: SchoolItem[] = [
    {
        schoolYear: "2022-2023",
        enrolled_first_sem: 100,
        enrolled_second_sem: 120,
        sections: 10,
    },
    {
        schoolYear: "2023-2024",
        enrolled_first_sem: 1000,
        enrolled_second_sem: 1200,
        sections: 10,
    },
];



function Enrollments() {
    const [openModal, setOpenModal] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    return (
        <div className="flex relative flex-col flex-1 min-h-0 w-full p-4">

            <div className="w-full flex items-center justify-between mb-2">
                <h1 className="text-2xl font-semibold text-[#030ff3]">
                    Enrollments
                </h1>
                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 mr-4 px-4 py-2 rounded shadow-blue-900 text-white bg-[#055bfa] hover:bg-blue-700 transition hover:scale-105 cursor-pointer">
                    <Plus size={20} />
                    Enroll Students
                </button>
            </div>
            <div className="flex flex-1 bg-[#ccc1c1] rounded min-h-0">
                {/*list of enrollments*/}
                <div
                    className="flex flex-1 max-w-70 bg-[#4e7986] border rounded m-2 overflow-auto  "
                >
                    <div className="w-full flex flex-col">
                        <div className="flex justify-between w-full gap-2 p-2 bg-[#ce7cfb] border-b">
                            <p className="flex whitespace-nowrap text-[#0b000a] font-semibold  ">School Years</p>
                            <div className="items-center justify-center gap-2 flex">
                                <p><CalendarSearch size={20} className="text-[#0038d2]" /></p>
                                <select
                                    id="filter"
                                    name="filter"
                                    className="border rounded">
                                    <option value="">2022-2023</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden w-full  h-full">
                            {/*enrollments year*/}
                            {data.map((item, index) => {
                                const color = colors[index % colors.length];
                                return (
                                    <div
                                        key={index}
                                        className={`border cursor-pointer mx-5 my-2 rounded p-2  flex flex-col gap-0.5 bg-blue-200 hover:scale-105 transform transition duration-200 ${isSelected ? "scale-105 border-2 rounded-xl" : ""}`}
                                        style={{ borderTop: `4px solid ${color}` }}
                                    >
                                        <div className="flex w-full items-center justify-center border-b">
                                            <p className="font-semibold text-2xl" style={{ color }}>
                                                {item.schoolYear}
                                            </p>
                                        </div>
                                        <div className="flex-1 border-b">
                                            <div className="w-full flex items-center justify-center">
                                                <span className="text-[#0221ea] ">ENROLLED</span>
                                            </div>
                                            <div className="flex-1 flex justify-between">
                                                <span className="text-black">1st sem: <span className="text-blue-700">{item.enrolled_first_sem}</span></span>
                                                <span>|</span>
                                                <span className="text-black">2nd sem: <span className="text-blue-700">{item.enrolled_second_sem}</span> </span>
                                            </div>
                                        </div>
                                        <p>Section Count - <span className="text-[#0007dc]">{item.sections}</span></p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/*enrollment details*/}
                <div className="flex flex-1 flex-col m-2 rounded overflow-auto p-2 gap-2  ">
                    {/*list of students enrolled*/}
                    <div className="flex-1  rounded flex-col flex ">
                        <div className="flex w-full items-center justify-between pb-2">
                            <div className="">
                                <p className="text-xl font-bold text-blue-700 p-2">Enrolled Students</p>
                            </div>
                            {/*search bar and filter*/}
                            <div className="flex flex-col gap-2 p-2 border rounded-lg bg-white shadow-sm">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Search
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Search student..."
                                            className="w-full pl-10 pr-3 py-1 border rounded-md"
                                        />
                                    </div>

                                    <button className="px-4 py-1 bg-blue-700 text-white rounded-md hover:bg-blue-600">
                                        Search
                                    </button>
                                </div>

                                {/* Filters */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-medium text-blue-700">
                                            Grade
                                        </label>
                                        <select className="px-2 py-1 border rounded-md">
                                            <option>All</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-medium text-blue-700">
                                            Section
                                        </label>
                                        <select className="px-2 py-1 border rounded-md">
                                            <option>All</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-medium text-blue-700">
                                            Semester
                                        </label>
                                        <select className="px-2 py-1 border rounded-md">
                                            <option>All</option>
                                            <option>1st</option>
                                            <option>2nd</option>
                                        </select>
                                    </div>

                                    <button className="flex items-center gap-2 px-4 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600">
                                        <Filter size={18} />
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-y flex-col  w-full rounded  ">
                            <div className="grid grid-cols-[50px_1fr_1fr_1fr_1fr_1fr_1fr_40px] py-2 px-4 bg-gray-600 text-white">
                                <div>No.</div>
                                <div>Account No.</div>
                                <div>Full Name.</div>
                                <div>Grade Level</div>
                                <div>Section</div>
                                <div>Semester</div>
                                <div>Enrolled Date</div>
                                <div className="flex items-center justify-center">Action</div>
                            </div>
                        </div>
                        <div className="flex flex-1 w-full flex-col border min-h-0 overflow-auto">
                            <div className="grid grid-cols-[50px_1fr_1fr_1fr_1fr_1fr_1fr_40px] py-2 px-4 border-b">
                                <div>1</div>
                                <div>124543 </div>
                                <div>Gerona, Reven, Amazona</div>
                                <div>Grade 7</div>
                                <div>7-1</div>
                                <div>1st</div>
                                <div>May 10 2026</div>
                                <div className="flex items-center justify-center"><Trash2 /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openModal && <EnrollStudentsModal open={openModal} setOpen={setOpenModal} />}
        </div>
    )
}

export default Enrollments;