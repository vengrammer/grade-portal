import { Calendar, CalendarSearch, Plus, PlusCircle, Trash2, UserPlus, UsersRound } from "lucide-react";

import EnrollStudentsModal from "../EnrollStudentsModal";
import { useState } from "react";
import GradeLevels from "./GradeLevels";

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

const grade_level = [
    { name: "Grade 7" },
    { name: "Grade 8" },
    { name: "Grade 9" },
    { name: "Grade 10" },
]

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
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-[#055bfa] hover:bg-blue-700 transition hover:scale-105 cursor-pointer">
                    <Plus size={20} />
                    Enroll Student
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
                            {/*sample data*/}
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
                <div className="flex flex-1 flex-col border m-2 rounded overflow-auto p-2 gap-2  ">
                    {/* grade level */}
                    <div className="flex w-full border rounded bg-[#ce7cfb] flex-col p-2 gap-4">
                        <div className="flex w-full items-center justify-center">
                            <p className="text-xl font-semibold text-green">Grade level</p>
                        </div>
                        <div className="flex-1 flex overflow-x-auto gap-4 ">
                            {grade_level.map((g, index) => {
                                const color = colors[index % colors.length];
                                return (
                                    <div style={{ background: color }} key={index}
                                        className={`border flex-1 min-w-30 min-h-15 flex flex-col gap-2 p-2  rounded `}>
                                        <div className="w-full flex items-center justify-center flex-1">
                                            <p className="text-xl font-semibold text-black  ">{g.name}</p>
                                        </div>
                                        <div className="flex-1 flex items-center justify-center gap-4">
                                            <button className="border bg-green-600 p-2 text-white rounded-xl cursor-pointer "><UsersRound /></button>
                                            <button className="border p-2 bg-blue-800 text-white rounded-xl cursor-pointer"><UserPlus /></button>
                                        </div>
                                    </div>)
                            })}
                        </div>
                    </div>
                    {/*list of students enrolled*/}
                    <div className="flex-1 border rounded flex-col flex">
                        <div className="flex w-full">
                            <p>Students</p>
                        </div>
                        <div className="flex border-y flex-col  w-full ">
                            <div className="grid grid-cols-[50px_1fr_1fr_1fr_1fr_40px] py-2 px-4 bg-gray-600 text-white">
                                <div>No.</div>
                                <div>Student No.</div>
                                <div>Full Name.</div>
                                <div>Section</div>
                                <div>Enrolled Date</div>
                                <div className="flex items-center justify-center">Action</div>
                            </div>
                        </div>  
                        <div className="flex flex-1 w-full flex-col border min-h-0 overflow-auto">
                            <div className="grid grid-cols-[50px_1fr_1fr_1fr_1fr_40px] py-2 px-4 border-b">
                                <div>1</div>
                                <div>124543 </div>
                                <div>Gerona, Reven, Amazona</div>
                                <div>7-1</div>
                                <div>May 10 2026</div>
                                <div className="flex items-center justify-center"><Trash2/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EnrollStudentsModal open={openModal} setOpen={setOpenModal} />
        </div>
    )
}

export default Enrollments;