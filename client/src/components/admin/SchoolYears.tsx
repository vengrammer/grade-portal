
import { Plus } from "lucide-react";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import { getSchoolyears, addSchoolYear } from "../../hooks/schoolYear";
import type { SchoolYearType } from "../../types/schoolYear.type";
import { dateFormatter } from "../../utils/dateFormatter";

import LoadingScreen from "../shared/LoadingScreen";


function Schoolyears() {
    const [schoolYear, setSchoolYear] = useState<SchoolYearType[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchSchoolyears = async () => {
        try {
            setLoading(true);
            const data = await getSchoolyears();
            setSchoolYear(data);
        } catch (error: any) {
            toast.error(error.message || "Something went wrong")
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSchoolyears();
    }, []);


    const handleAddSchoolYear = async (e: React.MouseEvent<HTMLButtonElement>) =>   {
        e.preventDefault();
        try {
            setLoading(true);
            await addSchoolYear();
            toast.success("School year added successfully");
            fetchSchoolyears();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong")
        }finally{
            setLoading(false);
        }

    }

    return (
        <div className="relative flex flex-col flex-1 min-h-0 w-full p-4">
            <div className="w-full flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-[#030ff3]">
                    School Years
                </h1>
                <button
                    onClick={handleAddSchoolYear}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-[#055bfa] hover:bg-blue-700 transition">
                    <Plus size={20} />
                    School Years
                </button>
            </div>
            <div className="flex flex-col flex-1 min-h-0 w-full border rounded-2xl bg-white">
                <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_120px] bg-gray-100 border-b px-4 rounded-t-2xl py-3 font-semibold text-[#030ff3]">
                    <div>No.</div>
                    <div>School Year</div>
                    <div>Active</div>
                    <div>Created At</div>
                    <div>Updated At</div>
                    <div className="text-center">Actions</div>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto ">
                    {schoolYear.length === 0 ? (<div className="flex items-center justify-center h-full">No school years</div>) : schoolYear.map((s, index) => (<div key={s._id} className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_120px] items-center px-4 py-3 border-b hover:bg-[#b8bbbd] transition">
                        <div>{index + 1}</div>
                        <div>{s.school_year}</div>
                        <div>{s.is_active ? "Active" : "Inactive"}</div>
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
            {loading && <LoadingScreen  loadingFor="component"/>}
        </div>
    )
}
export default Schoolyears;