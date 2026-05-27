import { toast } from "react-toastify";
import { useState, useEffect } from "react";


import { getGradingPeriods } from "../../hooks/gradingPeriods";
import { dateFormatter } from "../../utils/dateFormatter";
import type { GradingPeriodType } from "../../types/gradingPeriod.type";


function GradingPeriod() {
    const [gradingPeriod, setGradingPeriod] = useState<GradingPeriodType[]>([]);

    const fetchGradingPeriod = async () => {
        try {
            const data = await getGradingPeriods();
            setGradingPeriod(data);
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }
    }
    useEffect(() => {
        fetchGradingPeriod();
    }, []);




    return (
        <div className="flex flex-col flex-1 min-h-0 w-full p-4">

             <div className="w-full flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-[#030ff3]">
                    Grading Period
                </h1>
            </div>

            
            <div className="flex flex-col flex-1 min-h-0 w-full border rounded-2xl bg-white">
                <div className="grid grid-cols-[1fr_1fr_1fr_1fr] bg-gray-100 border-b px-4 rounded-t-2xl py-3 font-semibold text-[#030ff3]">
                    <div>No.</div>
                    <div>Grading Period </div>
                    <div>Created At</div>
                    <div>Updated At</div>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto ">
                    {gradingPeriod.length === 0 ? (<div className="flex items-center justify-center h-full">No Grading Period</div>) : gradingPeriod.map((g, index) => (<div key={g._id} className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center px-4 py-3 border-b hover:bg-[#b8bbbd] transition">
                        <div>{index + 1}</div>
                        <div>{g.name}</div>
                        <div>{dateFormatter(g.createdAt)}</div>
                        <div>{dateFormatter(g.updatedAt)}</div>
                       
                    </div>))}
                </div>
            </div>
        </div>
    )
}
export default GradingPeriod;