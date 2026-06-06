import { X } from "lucide-react"

import { getSubjects } from "../../hooks/subjects"
import { getSchoolyears } from "../../hooks/schoolYear"
import { getSections } from "../../hooks/section"
import { getUsersByRole } from "../../hooks/user"


import type { SectionType } from "../../types/sections.type"
import type { SchoolYearType } from "../../types/schoolYear.type"
import type { SubjectType } from "../../types/subjects.type"
import type { UserType } from "../../types/user.type"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


interface IModal {
    open: boolean
    setOpen: (value: boolean) => void
    refeacth?: () => void
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

    const [schoolYear, setSchoolYear] = useState<SchoolYearType[]>([])
    const [subjects, setSubjects] = useState<SubjectType[]>([])
    const [section, setSection] = useState<SectionType[]>([])
    const [teacher, setTeacher] = useState<UserType[]>([])

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
            const res = await getUsersByRole("teacher")
            setTeacher(res)
        } catch (error: any) {
            setError(error.message)
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center">
                <div className="relative w-full max-w-200 md:mx-4  bg-white md:rounded-xl shadow-xl p-5 max-h-screen overflow-y-auto">
                    <div className="flex w-full justify-between md:mb-2">
                        <h2 className="text-xl font-semibold">Assign Teachers </h2>
                        <button><X size={20} onClick={() => setOpen(false)} /></button>
                    </div>
                    <div className="min-h-0 flex flex-col gap-4">
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
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md">
                                    <option value="default">select subject</option>
                                    {subjects.length === 0 ? (<option disabled>No Subject</option>) : (
                                        subjects.map((e, index) => (
                                            <option key={index} value={e._id}>{e.name}</option>
                                        ))
                                    )}
                                </select>
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
                                    // onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md">
                                    <option value="default">select section</option>
                                    {section.length === 0 ? (<option disabled>No section</option>) : (
                                        section.map((e, index) => (
                                            <option key={index} value={e._id}>{e.name}</option>
                                        ))
                                    )}
                                </select>
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
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md">
                                    <option value="default">select school year</option>
                                    {schoolYear.length === 0 ? (<option disabled>No School Year</option>) : (
                                        schoolYear.map((e, index) => (
                                            <option key={index} value={e._id}>{e.school_year}</option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>
                        {/* Students that not enrolled*/}
                        <div className="flex flex-1 flex-col w-full border min-h-120 overflow-auto rounded-xl">
                            <div className="grid grid-cols-[100px_1fr_80px_70px_1fr] bg-gray-400 py-2 px-4 font-semibold">
                                <div className="whitespace-nowrap">Account No.</div>
                                <div className="whitespace-nowrap">Full Name</div>
                                <div className="whitespace-nowrap">Gender</div>
                                <div className="whitespace-nowrap">Active</div>
                                <div className="whitespace-nowrap flex items-center justify-center">Action</div>
                            </div>
                            <div className="flex min-h-0 flex-col flex-1 overflow-auto">
                                {teacher.length === 0 ? <div className="flex flex-1 items-center justify-center">No teacher found</div> :
                                    teacher.map((t, index) => (<div key={index} className="grid grid-cols-[100px_1fr_80px_70px_1fr] py-2 px-4 border-b">
                                        <div>{t.account_number}</div>
                                        <div>{t.last_name}, {t.first_name}, {t.middle_name}</div>
                                        <div>{t.gender.charAt(0).toUpperCase() + t.gender.slice(1)}</div>
                                        <div>{t.is_active ? "Yes" : "No"}</div>
                                        <div className="flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                name="teacher_id"
                                                value={t._id}
                                                onChange={handleChange}
                                                className="w-5 h-5  cursor-pointer text-green-600"
                                            />
                                        </div>
                                    </div>))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignTeacherModal