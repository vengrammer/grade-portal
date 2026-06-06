import { X } from "lucide-react"

import { getSubjects } from "../../hooks/subjects"
import { getSchoolyears } from "../../hooks/schoolYear"
import { getSections } from "../../hooks/section"
import { getUsersByRole } from "../../hooks/user"

import { assingTeacher } from "../../hooks/teacherAssingment"


import type { SectionType } from "../../types/sections.type"
import type { SchoolYearType } from "../../types/schoolYear.type"
import type { SubjectType } from "../../types/subjects.type"
import type { UserType } from "../../types/user.type"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


interface IModal {
    open: boolean
    setOpen: (value: boolean) => void
    refeacth: () => void
}

interface ITeacherAssignmet {
    teacher_id: string
    subject_id: string
    section_id: string
    school_year_id: string
}

function AssignTeacherModal({ open, setOpen, refeacth }: IModal) {

    const [formData, setFormData] = useState<ITeacherAssignmet>({
        teacher_id: "",
        subject_id: "",
        section_id: "",
        school_year_id: "",
    });

    if (!open) return null

    const [schoolYear, setSchoolYear] = useState<SchoolYearType[]>([]);
    const [subjects, setSubjects] = useState<SubjectType[]>([]);
    const [section, setSection] = useState<SectionType[]>([]);
    const [teacher, setTeacher] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(false);

    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    const [error, setError] = useState("")

    const feacthSchoolYear = async () => {
        try {
            const res = await getSchoolyears()
            setSchoolYear(res)
        } catch (error: any) {
            setError(error.message)
        }
    }
    const feacthSubjects = async () => {
        try {
            const res = await getSubjects()
            setSubjects(res)
        } catch (error: any) {
            setError(error.message)
        }

    }
    const feacthSections = async () => {
        try {
            const res = await getSections()
            setSection(res)
        } catch (error: any) {
            setError(error.message)
        }
    }

    const feacthTeachers = async () => {
        try {
            setLoading(true)
            const res = await getUsersByRole("teacher")
            setTeacher(res)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        feacthSchoolYear();
        feacthSubjects();
        feacthSections();
        feacthTeachers();
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(error || "Something went wrong");
        }
    }, [error]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === "teacher_id") {
            setFormData((prev) => ({
                ...prev,
                teacher_id: prev.teacher_id === value ? "" : value,
            }));

            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData)

        if (!formData.subject_id || !formData.section_id || !formData.school_year_id) {
            toast.error("Please fill all the fields")
            return
        }
        if (!formData.teacher_id) {
            toast.error("Please select a teacher")
            return
        }

        try {
            await assingTeacher(formData)
            toast.success("Teacher assigned successfully")
            refeacth
            setFormData({
                teacher_id: "",
                subject_id: "",
                section_id: "",
                school_year_id: "",
            })

        } catch (error: any) {
            if (error.errors?.length) {
                const fieldErrors: Record<string, string> = {};

                error.errors.forEach((err: any) => {
                    fieldErrors[err.path] = err.msg;
                });
                setFormErrors(fieldErrors);
                toast.error('Fix the highlighted fields');
                return;

            }
            toast.error(error.message || "Something went wrong")
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center">
                <div className="relative w-full max-w-200 md:mx-4  bg-white md:rounded-xl shadow-xl p-5 max-h-screen overflow-y-auto">
                    <div className="flex w-full justify-between md:mb-2">
                        <h2 className="text-xl font-semibold">Assign Teachers </h2>
                        <button><X size={20} onClick={() => setOpen(false)} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="min-h-0 flex flex-col gap-4">
                        <p className="flex border-b ">Select Info</p>
                        <div className="flex w-full gap-2">
                            <div className="flex flex-col w-full ">
                                <label
                                    htmlFor="subject_id"
                                    className="block text-gray-700 font-semibold"
                                >
                                    Subject
                                </label>
                                <select
                                    name="subject_id"
                                    id="subject_id"
                                    required
                                    value={formData.subject_id}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md">
                                    <option value="">select subject</option>
                                    {subjects.length === 0 ? (<option disabled>No Subject</option>) : (
                                        subjects.map((e, index) => (
                                            <option key={index} value={e._id}>{e.name}</option>
                                        ))
                                    )}
                                </select>
                                {formErrors.subject_id && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formErrors.subject_id}
                                    </p>
                                )}
                            </div>


                            <div className="flex flex-col w-full ">
                                <label
                                    htmlFor="section_id"
                                    className="block text-gray-700 font-semibold"
                                >
                                    Section
                                </label>
                                <select
                                    name="section_id"
                                    id="section_id"
                                    required
                                    value={formData.section_id}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md">
                                    <option value="">select section</option>
                                    {section.length === 0 ? (<option disabled>No section</option>) : (
                                        section.map((e, index) => (
                                            <option key={index} value={e._id}>{e.name}</option>
                                        ))
                                    )}
                                </select>
                                {formErrors.section_id && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formErrors.section_id}
                                    </p>
                                )}
                            </div>


                            <div className="flex flex-col w-full ">
                                <label
                                    htmlFor="school_year_id"
                                    className="block text-gray-700 font-semibold"
                                >
                                    School Year
                                </label>
                                <select
                                    name="school_year_id"
                                    id="school_year_id"
                                    required
                                    value={formData.school_year_id}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md">
                                    <option value="">select school year</option>
                                    {schoolYear.length === 0 ? (<option disabled>No School Year</option>) : (
                                        schoolYear.map((e, index) => (
                                            <option key={index} value={e._id}>{e.school_year}</option>
                                        ))
                                    )}
                                </select>
                                {formErrors.school_year_id && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formErrors.school_year_id}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* list of teachers*/}
                        <div className="flex flex-1 flex-col w-full border min-h-120 overflow-auto rounded-xl">
                            <div className="grid grid-cols-[100px_1fr_80px_70px_40px] bg-gray-400 py-2 px-4 font-semibold">
                                <div className="whitespace-nowrap">Account No.</div>
                                <div className="whitespace-nowrap">Full Name</div>
                                <div className="whitespace-nowrap">Gender</div>
                                <div className="whitespace-nowrap">Active</div>
                                <div className="whitespace-nowrap flex items-center justify-center">Action</div>
                            </div>
                            <div className="flex min-h-0 flex-col flex-1 overflow-auto">
                                {loading ?
                                    <div className="flex flex-1 items-center justify-center">Loading...</div>
                                    :
                                    teacher.length === 0 ? <div className="flex flex-1 items-center justify-center">No teacher found</div> :
                                        teacher.map((t, index) => (<div key={index} className="grid grid-cols-[100px_1fr_80px_70px_40px] py-2 px-4 border-b">
                                            <div>{t.account_number}</div>
                                            <div>{t.last_name}, {t.first_name}, {t.middle_name}</div>
                                            <div>{t.gender.charAt(0).toUpperCase() + t.gender.slice(1)}</div>
                                            <div>{t.is_active ? "Yes" : "No"}</div>
                                            <div className="flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    name="teacher_id"
                                                    value={t._id}
                                                    checked={formData.teacher_id === t._id}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 cursor-pointer text-green-600"
                                                />
                                            </div>
                                        </div>))}
                            </div>
                        </div>

                        <div className="flex w-full justify-end  gap-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-9 cursor-pointer py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AssignTeacherModal