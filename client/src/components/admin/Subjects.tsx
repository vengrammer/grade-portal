
import { Plus } from "lucide-react";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import { getSubjects, addSubjects } from "../../hooks/subjects";
import type { SubjectType } from "../../types/subjects.type";
import { dateFormatter } from "../../utils/dateFormatter";

import LoadingScreen from "../shared/LoadingScreen";

interface AddSubjectProps {
    onClose: () => void;
    openModal: boolean;
    refreshSubjects: () => void;
}

export function AddSubject({ onClose, openModal, refreshSubjects }: AddSubjectProps) {

    const [subjectName, setSubjectName] = useState("");
    const [description, setDescription] = useState("");

    async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!subjectName || !description) {
            toast.error("Please enter a grade level name and description");
            return;
        }
        const validName = subjectName.trim().charAt(0).toUpperCase() + subjectName.trim().slice(1);

        try {
            const response = await addSubjects(validName, description.trim());
            toast.success(response.message);
            refreshSubjects();
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
                <h2 className="text-2xl font-semibold mb-4">Add Subject</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="gradeLevel"
                            className="block text-gray-700 font-semibold"
                        >
                            Subject Name
                        </label>
                        <input
                            type="text"
                            id="gradeLevel"
                            className="w-full px-3 py-2 border rounded-md"
                            value={subjectName}
                            required
                            onChange={(e) => setSubjectName(e.target.value)}
                        />


                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="gradeLevel"
                            className="block text-gray-700 font-semibold"
                        >
                            Subject Description
                        </label>
                        <input
                            type="text"
                            id="gradeLevel"
                            required
                            className="w-full px-3 py-2 border rounded-md"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

function Subjects() {
    const [openModal, setOpenModal] = useState(false);
    const [subjects, setSubjects] = useState<SubjectType[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchSubjects = async () => {
        try {
            setLoading(true);
            const data = await getSubjects();
            setSubjects(data);
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <div className="relative flex flex-col flex-1 min-h-0 w-full p-4">
            <div className="w-full flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-[#030ff3]">
                    Subjects
                </h1>
                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-[#055bfa] hover:bg-blue-700 transition">
                    <Plus size={20} />
                    Subjects
                </button>
            </div>
            <div className="flex flex-col flex-1 min-h-0 w-full border rounded-2xl bg-white">
                <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_120px] bg-gray-100 border-b px-4 rounded-t-2xl py-3 font-semibold text-[#030ff3]">
                    <div>No.</div>
                    <div>Subject</div>
                    <div>Description</div>
                    <div>Created At</div>
                    <div>Updated At</div>
                    <div className="text-center">Actions</div>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto ">
                    {subjects.length === 0 ? (<div className="flex items-center justify-center h-full">No subjects found</div>) : subjects.map((s, index) => (<div key={s._id} className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_120px] items-center px-4 py-3 border-b hover:bg-[#b8bbbd] transition">
                        <div>{index + 1}</div>
                        <div>{s.name}</div>
                        <div>{s.description}</div>
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
            </div>
            {openModal && <AddSubject openModal={openModal} onClose={() => setOpenModal(false)} refreshSubjects={fetchSubjects} />}
            {loading && <LoadingScreen loadingFor="component" />}
        </div>
    )
}
export default Subjects;