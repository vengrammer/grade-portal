
import { useState, useEffect } from "react";
import { Plus, Trash, Pencil, X } from "lucide-react";
import { toast } from "react-toastify";

import { dateFormatter } from "../../utils/dateFormatter";
import type { SectionType } from "../../types/sections.type";
import type { GradeLevelType } from "../../types/gradeLevel.type";


import { getGradeLevels } from "../../hooks/gradeLevel";
import { addSection } from "../../hooks/section";
import { getSections } from "../../hooks/section";

import { motion } from "motion/react"
interface AddSectionProps {
    onClose: () => void;
    openModal: boolean;
    refreshSections: () => void;
}

export function AddGradeLevel({ onClose, openModal, refreshSections }: AddSectionProps) {
    const [gradeLevels, setGradeLevels] = useState<GradeLevelType[]>([]);
    const [selectedGradeLevel, setSelectedGradeLevel] = useState("");
    const [sectionName, setSectionName] = useState("");

    //get the grade levels
    const fetchGradeLevels = async () => {
        try {
            const data = await getGradeLevels();
            setGradeLevels(data);
            refreshSections();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }
    }
    useEffect(() => {
        fetchGradeLevels();
    }, []);


    async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!sectionName) {
            toast.error("Please enter a section name");
            return;
        }
        if (!selectedGradeLevel) {
            toast.error("Please select a grade level");
            return;
        }
        const validName = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
        try {
            const response = await addSection(validName, selectedGradeLevel);
            refreshSections();
            toast.success(response.message);
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }
    }

    if (!openModal) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-xl p-6">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                >
                    <X size={20} />
                </button>
                <h2 className="text-2xl font-semibold mb-4">Add Section</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4 flex flex-col gap-5">
                        <div>
                            <label className="block text-gray-700 font-semibold" >Select Grade Level</label>
                            <select
                                required
                                value={selectedGradeLevel}
                                onChange={(e) => setSelectedGradeLevel(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="" disabled>
                                    Select grade level
                                </option>

                                {gradeLevels.map((gradeLevel) => (
                                    <option key={gradeLevel._id} value={gradeLevel._id}>
                                        {gradeLevel.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label

                                className="block text-gray-700 font-semibold"
                            >
                                Section Name
                            </label>
                            <input
                                type="text"
                                id="gradeLevel"
                                className="w-full px-3 py-2 border rounded-md"
                                value={sectionName}
                                required
                                onChange={(e) => setSectionName(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className="flex w-full items-center justify-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500  text-white rounded-md hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


function Sections() {
    const [openModal, setOpenModal] = useState(false);
    const [sections, setSections] = useState<SectionType[]>([]);

    function fetchSections() {
        const fetchGradeLevels = async () => {
            try {
                const data = await getSections();
                setSections(data);
            } catch (error: any) {
                toast.error(error.message || "Something went wrong");
            }
        };
        fetchGradeLevels();
    }
    useEffect(() => {
        fetchSections();
    }, []);

    return (
        <div className="flex flex-col flex-1 min-h-0 w-full p-4">
            <div className="w-full flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-[#030ff3]">
                    Sections
                </h1>
                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-[#055bfa] hover:bg-blue-700 transition">
                    <Plus size={20} />
                    Section
                </button>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2  }}
                className="flex flex-col flex-1 min-h-0 w-full border rounded-2xl bg-white">
                <div

                    className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_80px] bg-gray-100 border-b px-4 rounded-t-2xl py-3 font-semibold text-[#030ff3]">
                    <div>No.</div>
                    <div>Section Name</div>
                    <div>Grade Level</div>
                    <div>Created At</div>
                    <div>Updated At</div>
                    <div className="text-center">Actions</div>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto ">
                    {sections.length === 0 ? (<div className="flex items-center justify-center h-full">No grade levels found</div>) : sections.map((s, index) => (<div key={s._id} className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_80px] items-center px-4 py-3 border-b hover:bg-[#b8bbbd] transition">
                        <div>{index + 1}</div>
                        <div>{s.name}</div>
                        <div>{s.grade_level?.name}</div>
                        <div>{dateFormatter(s.createdAt)}</div>
                        <div>{dateFormatter(s.updatedAt)}</div>
                        <div className="flex items-center justify-center gap-2">
                            <button className="bg-blue-600 p-2 rounded text-white hover:bg-blue-800">
                                <Pencil size={20} />
                            </button>
                            <button className="bg-red-600 border p-2 rounded text-white  hover:bg-red-800">
                                <Trash size={20} />
                            </button>
                        </div>
                    </div>))}
                </div>
            </motion.div>
            {openModal && <AddGradeLevel openModal={openModal} onClose={() => setOpenModal(false)} refreshSections={fetchSections} />}
        </div>
    )
}

export default Sections;