import { Filter, Search, Trash2, X } from "lucide-react"
import { useState, useEffect } from "react"

import { getGradeLevels } from "../hooks/gradeLevel"
import { getSections } from "../hooks/section"
import { getSchoolyears } from "../hooks/schoolYear"

import type { GradeLevelType } from "../types/gradeLevel.type"
import type { SectionType } from "../types/sections.type"
import type { SchoolYearType } from "../types/schoolYear.type"
import { toast } from "react-toastify"

import { getAvailableStudentsForEnrollment } from "../hooks/enrollment"
import type { UserType } from "../types/user.type"

interface EnrollStudentsModalProps {
    open: boolean
    setOpen: (value: boolean) => void
}

type school_sem = "1st" | "2nd"

interface IEnrollment {
    school_year_id: string,
    grade_level_id: string,
    school_sem: school_sem,
    section_id: string,
    student_selected: string[]
}

function EnrollStudentsModal({ open, setOpen }: EnrollStudentsModalProps) {
    if (!open) return null
    const [gradeLevel, setGradeLevel] = useState<GradeLevelType[]>([])
    const [sections, setSections] = useState<SectionType[]>([])
    const [schoolYear, setSchoolYear] = useState<SchoolYearType[]>([])
    const [availableStudent, setAvailableStudent] = useState<UserType[]>([])

    const [formData, setFormData] = useState<IEnrollment>({
        school_year_id: "",
        grade_level_id: "",
        school_sem: "1st",
        section_id: "",
        student_selected: [],
    })

    //get the grade level so I can past in the
    const fetchGradeLevels = async () => {
        try {
            const data = await getGradeLevels();
            setGradeLevel(data);

            //when mount set the first data
            if (data.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    grade_level_id: data[0]._id,
                }));
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong")
        }
    }

    const fetchSchoolYear = async () => {
        try {
            const data = await getSchoolyears();
            if (data.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    school_year_id: data[0]._id,
                }));
            }
            setSchoolYear(data);
        } catch (error: any) {
            toast.error(error.message || "Something went wrong")
        }
    }


    useEffect(() => {
        fetchGradeLevels()
        fetchSchoolYear()
    }, [])

    const fetchSections = async () => {
        try {
            const data = await getSections(formData.grade_level_id)

            if (data.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    section_id: data[0]._id,
                }));
            }
            setSections(data)
        } catch (error: any) {
            toast.error(error.message || "Something went wrong")
        }
    }

    useEffect(() => {
        if (!formData.grade_level_id) return;
        fetchSections()
    }, [formData.grade_level_id])

    async function handleViewAvailableStudent(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        try {
            const param = {
                school_year_id: formData.school_year_id,
                school_sem: formData.school_sem,
                section_id: formData.section_id
            }
            if (!formData.school_year_id || !formData.school_sem || !formData.section_id) {
                toast.error("Please select a school year, school semester and section")
            }

            const availableStudent = await getAvailableStudentsForEnrollment(param);
            setAvailableStudent(availableStudent)

        } catch (error: any) {
            toast.error(error.message || "Something went wrong")
        }
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        const shouldResetStudents =
            name === "school_year_id" ||
            name === "grade_level_id" ||
            name === "school_sem" ||
            name === "section_id";

        setFormData((prev) => ({
            ...prev,
            [name]: value,
            student_selected: shouldResetStudents ? [] : prev.student_selected,
        }));

        if (shouldResetStudents) {
            setAvailableStudent([]);
        }
    }

    function handleToggleStudent(id: string) {
        setFormData((prev) => ({
            ...prev,
            student_selected: prev.student_selected.includes(id)
                ? prev.student_selected.filter((x) => x !== id)
                : [...prev.student_selected, id],
        }));
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formData)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center">
                <div className="relative w-full max-w-300 md:mx-4 bg-white md:rounded-xl shadow-xl p-5 max-h-screen overflow-y-auto">
                    <div className="flex w-full justify-between mb-2">
                        <h2 className="text-xl font-semibold">Enroll A Students </h2>
                        <button><X size={20} onClick={() => setOpen(false)} /></button>
                    </div>
                    <div className="flex flex-col ">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
                            <div className="flex w-full border-b">
                                <p>Enrollment info</p>
                            </div>
                            {/* Enrollment info*/}
                            <div className="flex flex-1 gap-2">

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
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-md">
                                        {schoolYear.map((e, index) => (
                                            <option key={index} value={e._id}>{e.school_year}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="gradelevel"
                                        className="block text-gray-700 font-semibold"
                                    >
                                        Grade Level
                                    </label>
                                    <select
                                        name="grade_level_id"
                                        id="grade_level_id"
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-md">
                                        {gradeLevel.map((e, index) => (
                                            <option key={index} value={e._id}>{e.name}</option>
                                        ))}
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
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-md">
                                        {sections.map((s, index) => (
                                            <option key={index} value={s._id}>{s.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="school_sem"
                                        className="w-full flex items-center justify-center text-gray-700 font-semibold "
                                    >
                                        Semester
                                    </label>
                                    <div className="flex  flex-1 justify-center items-center gap-5">
                                        <label>
                                            <input
                                                type="radio"
                                                name="school_sem"
                                                value="1st"
                                                checked={formData.school_sem === "1st"}
                                                onChange={handleChange}
                                            />
                                            1st Sem
                                        </label>

                                        <label>
                                            <input
                                                type="radio"
                                                name="school_sem"
                                                value="2nd"
                                                checked={formData.school_sem === "2nd"}
                                                onChange={handleChange}
                                            />
                                            2nd Sem
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-between px-2 font-semibold mt-5">
                                <button
                                    type="button"
                                    disabled={!formData.school_year_id || !formData.grade_level_id || !formData.school_sem}
                                    onClick={handleViewAvailableStudent}
                                    className="hover:scale-105 transition transform duration-200 cursor-pointer border p-2 rounded bg-[#0e57d6] text-white flex gap-2"
                                >
                                    <Filter />
                                    View Available Students
                                </button>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Search student.."
                                        className="w-full px-2 py-2 border rounded-md"
                                    />
                                    <button className="border p-2 rounded bg-blue-700 text-white"><Search /></button>
                                </div>
                            </div>
                            {/* Students that not enrolled for*/}
                            <div className="flex flex-1 flex-col w-full border min-h-130 overflow-auto rounded-xl">
                                <div className="grid grid-cols-[1fr_1fr_1fr_1fr_100px] bg-gray-400 py-2 px-4 font-semibold" >
                                    <div className="whitespace-nowrap">Account No.</div>
                                    <div className="whitespace-nowrap">Full Name</div>
                                    <div className="whitespace-nowrap">Gender</div>
                                    <div className="whitespace-nowrap">Active</div>
                                    <div className="whitespace-nowrap flex items-center justify-center">Action</div>
                                </div>
                                <div className="flex min-h-0 flex-col flex-1 overflow-auto">
                                    {availableStudent.length === 0 ?
                                        <div className="flex flex-1 items-center justify-center">No student found</div>
                                        : availableStudent.map((s, index) => (
                                            <div key={index} className="grid grid-cols-[1fr_1fr_1fr_1fr_100px] py-2 px-4 border-b">
                                                <div>{s.account_number}</div>
                                                <div>{s.last_name}, {s.first_name}, {s.middle_name}</div>
                                                <div>{s.gender.charAt(0).toUpperCase() + s.gender.slice(1)}</div>
                                                <div>{s.is_active ? "Yes" : "No"}</div>
                                                <div className="flex items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5  cursor-pointer text-green-600"    
                                                        checked={formData.student_selected.includes(s._id)}
                                                        onChange={() => handleToggleStudent(s._id)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="flex flex-1 w-full item-center justify-end">
                                <button type="submit" className="border bg-[#081] py-2 px-2 text-white rounded-xl">Enroll Students</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EnrollStudentsModal