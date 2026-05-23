
import { Plus } from "lucide-react";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { X } from "lucide-react";

import { useState } from "react";

interface AddGradeLevelProps {
    onClose: () => void;
    openModal: boolean;
}

export function AddGradeLevel({ onClose, openModal }: AddGradeLevelProps) {
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
                <h2 className="text-2xl font-semibold mb-4">Add Grade Level</h2>
                <form>
                    <div className="mb-4">
                        <label
                            htmlFor="gradeLevel"
                            className="block text-gray-700 font-semibold"
                        >
                            Grade Level
                        </label>
                        <input
                            type="text"
                            id="gradeLevel"
                            className="w-full px-3 py-2 border rounded-md"
                        />
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

function GradeLevels() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="flex flex-col flex-1 min-h-0 w-full p-4">
            <div className="w-full flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-[#030ff3]">
                    Grade Levels
                </h1>
                <button
                onClick={() => setOpenModal(true)}
                 className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-[#055bfa] hover:bg-blue-700 transition">
                    <Plus size={20} />
                    Grade Level
                </button>
            </div>
            <div className="flex flex-col flex-1 min-h-0 w-full border rounded-2xl bg-white">
                <div className="grid grid-cols-[80px_1fr_1fr_1fr_120px] bg-gray-100 border-b px-4 rounded-t-2xl py-3 font-semibold text-[#030ff3]">
                    <div>No.</div>
                    <div>Grade Level</div>
                    <div>Created At</div>
                    <div>Updated At</div>
                    <div className="text-center">Actions</div>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto ">
                    <div className="grid grid-cols-[80px_1fr_1fr_1fr_120px] items-center px-4 py-3 border-b hover:bg-[#b8bbbd] transition">
                        <div>1</div>
                        <div>Grade 1</div>
                        <div>July 20, 2023</div>
                        <div>July 20, 2023</div>
                        <div className="flex items-center justify-center gap-4">
                            <button className="bg-blue-600 p-2 rounded text-white hover:bg-blue-800">
                                <Pencil size={20} />
                            </button>
                            <button className="bg-red-600 border p-2 rounded text-white  hover:bg-red-800">
                                <Trash size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {openModal && <AddGradeLevel openModal={openModal} onClose={() => setOpenModal(false)} />}
        </div>
    )
}
export default GradeLevels;