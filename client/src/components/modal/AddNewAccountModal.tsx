import { X, Plus, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";


import { toast } from "react-toastify";
import { accountnumber, addAccount } from "../../hooks/user";


type roleAccountToAdd = "student" | "teacher" | "admin";

export interface IUser {
    first_name: string;
    last_name: string;
    middle_name: string;
    contact_number: string;
    address: string;
    birth_date: string;
    profile_picture?: string;
    gender: string;
    email: string;
    password: string;
    account_number: string
    confirm_password: string
    role: roleAccountToAdd
}



interface IModal {
    roleAccountToAdd: roleAccountToAdd;
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    refreshAccounts: () => void;
}

function AddNewAccountModal({ roleAccountToAdd, openModal = false, setOpenModal, refreshAccounts }: IModal) {

    const [isLoading, setIsLoading] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({})


    const onClose = () => setOpenModal(false);
    const [formData, setFormData] = useState<IUser>({
        first_name: "",
        last_name: "",
        middle_name: "",
        address: "",
        birth_date: "",
        contact_number: "",
        gender: "",
        profile_picture: "",
        email: "",
        password: "",
        account_number: "",
        role: roleAccountToAdd,
        confirm_password: ""
    });

    if (!openModal) return null;

    const generateAccountNumber = async () => {
        try {
            setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        generateAccountNumber();
    }, [roleAccountToAdd]);


    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    }

    //font end input validation para hinde na mag rerequest sa server mag return agad ng error
    const validateForm = (data: typeof formData) => {
        const newErrors: Record<string, string> = {};

        if (!data.account_number) {
            newErrors.account_number = "Account number is required";
        }

        if (!data.first_name.trim()) {
            newErrors.first_name = "First name is required";
        }

        if (!data.last_name.trim()) {
            newErrors.last_name = "Last name is required";
        }

        if (!data.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!data.gender) {
            newErrors.gender = "Gender is required";
        }

        if (!data.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!data.contact_number.trim()) {
            newErrors.contact_number = "Contact number is required";
        }

        if (data.contact_number.length < 11) {
            newErrors.contact_number = "Contact number must be 11 digits";
        }

        if (!data.password) {
            newErrors.password = "Password is required";
        } else if (data.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!data.confirm_password) {
            newErrors.confirm_password = "Confirm your password";
        } else if (data.password !== data.confirm_password) {
            newErrors.confirm_password = "Passwords do not match";
        }

        return newErrors;
    };

    const handleCreateAccount = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);

        //stop if errors exist
        if (Object.keys(validationErrors).length > 0) {
            toast.error("Please fix the highlighted fields");
            setErrors(validationErrors);
            return;
        }

        const formatName = (value: string) => {
            return value.trim().charAt(0).toUpperCase() + value.trim().slice(1).toLowerCase();
        };

        try {
            const response = await addAccount({
                account_number: formData.account_number.trim(),
                first_name: formatName(formData.first_name),
                last_name: formatName(formData.last_name),
                middle_name: formatName(formData.middle_name),
                gender: formData.gender.trim().toLowerCase(),
                address: formData.address.trim(),
                birth_date: formData.birth_date,
                contact_number: formData.contact_number.trim(),
                email: formData.email.trim(),
                password: formData.password,
                confirm_password: formData.confirm_password,
                role: roleAccountToAdd,
                ...(formData.profile_picture && {
                    profile_picture: formData.profile_picture,
                }),
            });

            toast.success(response.message || "Account created successfully");
            refreshAccounts();
            onClose();
        } catch (error: any) {
            if (error.errors?.length) {
                const fieldErrors: Record<string, string> = {};

                error.errors.forEach((err: any) => {
                    fieldErrors[err.path] = err.msg;
                });
                setErrors(fieldErrors);
                return;
            }
            toast.error(error.message || "Something went wrong");
        }
    }

    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        setPreview(imageUrl);

        setFormData((prev) => ({
            ...prev,
            profile_picture: imageUrl,
        }));
    };

    const handleRemoveImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setPreview(null);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-xs"
            />
            <div className="relative w-full max-w-200 md:mx-4  bg-white md:rounded-xl shadow-xl p-5 max-h-screen overflow-y-auto">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                >
                    <X size={20} onClick={onClose} />
                </button>
                <h2 className="text-2xl font-semibold mb-3">{`Add New ${roleAccountToAdd.charAt(0).toUpperCase() + roleAccountToAdd.slice(1)}`}</h2>
                <form onSubmit={handleCreateAccount} className="flex flex-col md:gap-4 ">
                    <div className="flex-1 overflow-auto">
                        <div className="flex w-full flex-col items-center justify-between">
                            <div className="w-full flex  border-b mb-2"><p>Account Profile</p></div>
                            <div className="flex flex-1  w-full items-center justify-between gap-5 ">
                                <div className="flex-1">
                                    <label
                                        htmlFor="account_number"
                                        className="block text-gray-700 font-semibold "
                                    >
                                        Account Number(Auto Generated)
                                    </label>
                                    <input
                                        value={formData.account_number}
                                        onChange={handleChange}
                                        readOnly
                                        disabled
                                        name="account_number"
                                        type="text"
                                        id="account_number"
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
                            <div className="flex md:flex-row flex-col  w-full md:gap-4">
                                <div className="flex flex-1">
                                    <div className="flex flex-col w-full">
                                        <label
                                            htmlFor="first_name"
                                            className="block text-gray-700 font-semibold"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            id="first_name"
                                            name="first_name"
                                            required
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                        {errors.first_name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.first_name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-1 ">
                                    <div className="flex flex-col w-full">
                                        <label
                                            htmlFor="middle_name"
                                            className="block text-gray-700 font-semibold"
                                        >
                                            Middle Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.middle_name}
                                            onChange={handleChange}
                                            required
                                            id="middle_name"
                                            name="middle_name"
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                        {errors.middle_name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.middle_name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-1">
                                    <div className="flex flex-col w-full">
                                        <label
                                            htmlFor="last_name"
                                            className="block text-gray-700 font-semibold"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            id="last_name"
                                            name="last_name"
                                            required
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                        {errors.last_name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.last_name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col  w-full md:gap-4">
                                <div className="flex flex-1">
                                    <div className="flex flex-col w-full">
                                        <label
                                            htmlFor="birth_date"
                                            className="block text-gray-700 font-semibold"
                                        >
                                            Birth Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.birth_date}
                                            onChange={handleChange}
                                            id="birth_date"
                                            name="birth_date"
                                            required
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                        {errors.birth_date && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.birth_date}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-1 ">
                                    <div className="flex flex-col w-full">
                                        <label
                                            htmlFor="gender"
                                            className="block text-gray-700 font-semibold"
                                        >
                                            Gender
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            onChange={handleChange}
                                            required
                                            value={formData.gender}
                                            className=" px-3 py-2 border rounded-md"
                                        >
                                            <option disabled>
                                                Select gender
                                            </option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        {errors.gender && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.gender}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-1">
                                    <div className="flex flex-col w-full">
                                        <label
                                            htmlFor="contact_number"
                                            className="block text-gray-700 font-semibold"
                                        >
                                            Contact Number
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.contact_number}
                                            onChange={handleChange}
                                            id="contact_number"
                                            name="contact_number"
                                            required
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                        {errors.contact_number && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.contact_number}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="flex w-full flex-col">
                            <div className="flex md:flex-row flex-col  w-full md:gap-4">
                                <div className="flex flex-1">
                                    <div className="flex flex-col w-full">
                                        <label
                                            htmlFor="address"
                                            className="block text-gray-700 font-semibold"
                                        >
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={handleChange}
                                            id="address"
                                            name="address"
                                            required
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                        {errors.address && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.address}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-1 ">
                                    <div className="flex flex-col w-full">
                                        <label
                                            htmlFor="email"
                                            className="block text-gray-700 font-semibold"
                                        >
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            id="email"
                                            required
                                            name="email"
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full flex-col">
                            <div className="w-full flex items-start border-b mb-2"><p>Secuity</p></div>
                            <div className="flex md:flex-row flex-col  w-full md:gap-4">
                                <div className="flex flex-1">
                                    <div className="flex flex-col w-full">
                                        <label
                                            htmlFor="password"
                                            className="block text-gray-700 font-semibold"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            id="password"
                                            name="password"
                                            min={6}
                                            required
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                        {errors.password && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-1 ">
                                    <div className="flex flex-col w-full">
                                        <label
                                            htmlFor="confirm_password"
                                            className="block text-gray-700 font-semibold"
                                        >
                                            Confirm Password
                                        </label>
                                        <div className="flex-1 flex gap-2 ">
                                            <div className="flex-1 flex-col">
                                                <div className="flex-1 flex gap-2">
                                                    <input
                                                        type={viewPassword ? "text" : "password"}
                                                        value={formData.confirm_password}
                                                        onChange={handleChange}
                                                        id="confirm_password"
                                                        name="confirm_password"
                                                        min={6}
                                                        required
                                                        className="w-full px-3 py-2 border rounded-md"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setViewPassword(!viewPassword)}
                                                        className="border rounded p-0.5 cursor-pointer">
                                                        {viewPassword ? <EyeOff size={30} /> : <Eye size={30} />}
                                                    </button>
                                                </div>

                                                {errors.confirm_password && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {errors.confirm_password}
                                                    </p>
                                                )}
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center pt-5">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-15 py-2 bg-blue-500  text-white rounded-md hover:bg-blue-600"
                            >
                                {isLoading ? "Creating account..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddNewAccountModal;