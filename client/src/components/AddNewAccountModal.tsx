import { X, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { addTeacher } from "../hooks/user";
import { toast } from "react-toastify";
import { accountnumber } from "../hooks/user";

interface IUser {
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    password: string;
    account_number: string
}

type roleAccountToAdd = "student" | "teacher" | "admin";

interface IModal {
    roleAccountToAdd: roleAccountToAdd;
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    refreshAccounts: () => void;
}

function AddNewAccountModal({ roleAccountToAdd, openModal = false, setOpenModal, refreshAccounts }: IModal) {

    //get the account number 
    const [formData, setFormData] = useState<IUser>({
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        password: "",
        account_number: ""
    });

    if (!openModal) return null;


    const generateAccountNumber = async () => {
        try {
            const response = await accountnumber();
            if (!response) {
                toast.error("Failed to generate account number");
                setOpenModal(false);
            }

            setFormData((prev) => ({
                ...prev,
                account_number: response?.number,
            }));

        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }
    };

    useEffect(() => {
        generateAccountNumber();
    }, [roleAccountToAdd]);


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onClose = () => setOpenModal(false);

    console.log("account_number", formData.account_number);

    const handleCreateAccount = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addTeacher(formData.account_number,
                formData.first_name,
                formData.last_name,
                formData.middle_name,
                formData.email,
                formData.password);

            toast.success("Account created successfully");
            refreshAccounts();
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }
    }

    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    };

    const handleRemoveImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setPreview(null);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <div className="relative w-full max-w-lvh mx-4 bg-white rounded-2xl shadow-xl p-6">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                >
                    <X size={20} onClick={onClose} />
                </button>
                <h2 className="text-2xl font-semibold mb-3">{`Add New ${roleAccountToAdd}`}</h2>
                <form onSubmit={handleCreateAccount} className="flex flex-col gap-4">
                    <div className="flex w-full flex-col items-center justify-between">

                        <div className="w-full flex  border-b mb-2"><p>Account Number</p></div>
                        <div className="flex flex-1  w-full items-center justify-between gap-5 ">
                            <div className="flex-1">
                                <label
                                    htmlFor="firstName"
                                    className="block text-gray-700 font-semibold "
                                >
                                    Account Number(Auto Generated)
                                </label>
                                <input
                                    value={formData.account_number}
                                    onChange={handleChange}
                                    readOnly
                                    name="account_number"
                                    type="text"
                                    id="firstName"
                                    className="w-full px-3 py-2 border rounded-md items-center justify-items-center flex"
                                />
                            </div>
                            {/* Profile Picture*/}
                            <div className="flex-1 relative">
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Profile Picture
                                </label>
                                <div>
                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />

                                        {/* Avatar Box */}
                                        <div className="h-40 w-40  border-2 border-dashed rounded-full overflow-hidden flex items-center justify-center bg-gray-50 hover:border-blue-500 transition">

                                            {preview ? (
                                                <img
                                                    src={preview}
                                                    alt="Profile Preview"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center text-gray-500">
                                                    <Plus className="w-8 h-8" />
                                                    <p className="text-xs mt-1">Add Photo</p>
                                                </div>
                                            )}
                                        </div>
                                        {preview && (
                                            <button
                                                onClick={handleRemoveImage}

                                                className="absolute cursor-pointer top-10 right-65 bg-gray-400 font-bold  p-2 rounded-full shadow hover:bg-red-500 transition"
                                            >
                                                <X size={16} />
                                            </button>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-4">
                        <div className="w-full flex items-start border-b mb-2"><p>Basic info</p></div>
                        {/* Basic info*/}
                        <div className="flex lg:flex-row flex-col  w-full gap-4">
                            <div className="flex flex-1">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-gray-700 font-semibold"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-1 ">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-gray-700 font-semibold"
                                    >
                                        Middle Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-1">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-gray-700 font-semibold"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex lg:flex-row flex-col  w-full gap-4">
                            <div className="flex flex-1">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-gray-700 font-semibold"
                                    >
                                        Birth Date
                                    </label>
                                    <input
                                        type="date"
                                        id="firstName"
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-1 ">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-gray-700 font-semibold"
                                    >
                                        Gender
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-1">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-gray-700 font-semibold"
                                    >
                                        Contacr Number
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="flex w-full flex-col">
                        <div className="flex lg:flex-row flex-col  w-full gap-4">
                            <div className="flex flex-1">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-gray-700 font-semibold"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-1 ">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-gray-700 font-semibold"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex w-full flex-col">
                        <div className="w-full flex items-start border-b mb-2"><p>Secuity</p></div>
                        <div className="flex lg:flex-row flex-col  w-full gap-4">
                            <div className="flex flex-1">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-gray-700 font-semibold"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-1 ">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-gray-700 font-semibold"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center pt-5">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500  text-white rounded-md hover:bg-blue-600"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewAccountModal;