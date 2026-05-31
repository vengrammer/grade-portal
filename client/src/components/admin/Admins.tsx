

import { Eye, Plus, Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import { dateFormatter } from "../../utils/dateFormatter";
import type { UserType } from "../../types/user.type";

import AddNewAccountModal from "../modal/AddNewAccountModal";
import { getUsersByRole } from "../../hooks/user";

function Admins() {
    const [admins, setAdmins] = useState<UserType[]>([]);
    const [openModal, setOpenModal] = useState(false);

    const fetchAdmins = async () => {
        try {
            const data = await getUsersByRole("admin");
            setAdmins(data);
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }
    }
    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <div className="flex flex-col flex-1 min-h-0 w-full p-4">
            <div className="w-full flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-[#030ff3]">
                    Admins
                </h1>
                <button
                    onClick={() => setOpenModal(true)}
                    className="cursor-pointer hover:scale-110 transform transition-transform duration-200 flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-[#055bfa] hover:bg-blue-700">
                    <Plus size={20} />
                    Admin
                </button>
            </div>


            <div className="flex flex-col flex-1 min-h-0 w-full border rounded-2xl bg-white">
                <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_100px] bg-gray-100 border-b px-4 rounded-t-2xl py-3 font-semibold text-[#030ff3]">
                    <div>No.</div>
                    <div>Account No.</div>
                    <div>Full Name</div>
                    <div>is Active</div>
                    <div>Created At</div>
                    <div>Updated At</div>
                    <div>Actions</div>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto ">
                    {admins.length === 0 ? (<div className="flex items-center justify-center h-full">No Admins Found</div>) : admins.map((a, index) => (<div key={a._id} className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_100px] items-center px-4 py-3 border-b hover:bg-[#b8bbbd] transition">
                        <div>{index + 1}</div>
                        <div>{a.account_number}</div>
                        <div>{a.first_name} {a.last_name} {a.middle_name}</div>
                        <div>{a.is_active ? "Yes" : "No"}</div>
                        <div>{dateFormatter(a.createdAt)}</div>
                        <div>{dateFormatter(a.updatedAt)}</div>
                        <div className="flex items-center justify-center gap-1.5">
                            <button className="cursor-pointer bg-green-600 p-1 rounded text-white hover:bg-green-800 hover:scale-150 transition-transform duration-200 ease-in-out">
                                <Eye size={20} />
                            </button>
                            <button className="cursor-pointer bg-blue-600 p-1 rounded text-white hover:bg-blue-800 hover:scale-150 transition-transform duration-200 ease-in-out">
                                <Pencil size={20} />
                            </button>
                            <button className="cursor-pointer bg-red-600 border p-1 rounded text-white  hover:bg-red-800 hover:scale-150 transition-transform duration-200 ease-in-out">
                                <Trash size={20} />
                            </button>
                        </div>
                    </div>))}
                </div>
            </div>

            {openModal
                &&
                <AddNewAccountModal
                    roleAccountToAdd="admin"
                    openModal={openModal}
                    setOpenModal={setOpenModal} 
                    refreshAccounts={fetchAdmins}
                />}
        </div>
    )
}
export default Admins;