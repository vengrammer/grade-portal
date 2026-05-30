import { Search, Trash2, X } from "lucide-react"
import { useState, useEffect } from "react"

import { getGradeLevels } from "../hooks/gradeLevel"
import { getSections } from "../hooks/section"
import { getSchoolyears } from "../hooks/schoolYear"

import type { GradeLevelType } from "../types/gradeLevel.type"
import type { SectionType } from "../types/sections.type"
import type { SchoolYearType } from "../types/schoolYear.type"
import { toast } from "react-toastify"

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
    const [sem, setSem] = useState("")
    const [gradeLevel, setGradeLevel] = useState<GradeLevelType[]>([])
    const [sections, setSections] = useState<SectionType[]>([])
    const [schoolYear, setSchoolYear] = useState<SchoolYearType[]>([])

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
        fetchSections()
    }, [formData.grade_level_id])

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
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
                                                checked={sem === "1st"}
                                                onChange={(e) => setSem(e.target.value)}
                                            />
                                            1st Sem
                                        </label>

                                        <label>
                                            <input
                                                type="radio"
                                                name="school_sem"
                                                value="2nd"
                                                checked={sem === "2nd"}
                                                onChange={(e) => setSem(e.target.value)}
                                            />
                                            2nd Sem
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-between px-2 font-semibold mt-5">
                                <button type="button" className="hover:scale-105 transition transform duration-200 cursor-pointer border p-2 rounded bg-[#0e57d6] text-white flex gap-2"><Search /> View Students </button>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Search student.."
                                        className="w-full px-2 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                            {/* Students that not enrolled for*/}
                            <div className="flex flex-1 flex-col w-full border min-h-130 overflow-auto rounded-xl">
                                <div className="grid grid-cols-[1fr_1fr_1fr_1fr_100px] bg-gray-400 py-2 px-4 font-semibold" >
                                    <div className="whitespace-nowrap">Account No.</div>
                                    <div className="whitespace-nowrap">Full Name</div>
                                    <div className="whitespace-nowrap">Gender</div>
                                    <div className="whitespace-nowrap">Is Active</div>
                                    <div className="whitespace-nowrap">Action</div>
                                </div>
                                <div className="flex min-h-0 flex-col flex-1 overflow-auto">
                                    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_100px] py-2 px-4 border-b">
                                        <div>1</div>
                                        <div>124543 </div>
                                        <div>Gerona, Reven, Amazona</div>
                                        <div>Yes</div>
                                        <div className="flex items-center justify-center"><Trash2 /></div>
                                    </div>
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