import { Filter, Plus, Search, Trash2 } from "lucide-react";

import EnrollStudentsModal from "../modal/EnrollStudentsModal";
import React, { useEffect, useState } from "react";

import { getAllEnrolledStudents } from "../../hooks/enrollment";
import { toast } from "react-toastify";
import LoadingScreen from "../shared/LoadingScreen";
import { dateFormatter } from "../../utils/dateFormatter";


import { getSchoolyears } from "../../hooks/schoolYear";
import { getGradeLevels } from "../../hooks/gradeLevel";
import { getSections } from "../../hooks/section";


interface IEnrolledStudents {
    _id: string,
    createdAt: string;
    student: {
        _id: string;
        account_number: string;
        first_name: string;
        last_name: string;
        middle_name: string;
    },
    gradelevel: {
        name: string;
    },
    section: {
        name: string;
    },
    school_sem: string;
    schoolyear: {
        school_year: string;
    }

}

interface IFilter {
    school_year_id: string;
    grade_level_id?: string;
    school_sem?: string;
    section_id?: string;
    search_text?: string;
}


function Enrollments() {

    //filter data
    const [schoolYear, setSchoolYear] = useState<string>("");
    const [gradeLevel, setGradeLevel] = useState<string>("");
    const [schoolSem, setSchoolSem] = useState<string>("");
    const [section, setSection] = useState<string>("");

    const [openModal, setOpenModal] = useState(false);
    const [enrolledStudents, setEnrolledStudents] = useState<IEnrolledStudents[]>([]);
    const [loading, setLoading] = useState(false);

    const [filterData, setFilterData] = useState<IFilter>({
        school_year_id: "",
        grade_level_id: "",
        school_sem: "",
        section_id: "",
        search_text: "",
    });

    const changeSectionWhenGradeLevelChanges = async () => {
        try {
            setLoading(true);
            const data = await getSections(gradeLevel);
            setSection(data[0]._id);
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if(name === "grade_level_id") changeSectionWhenGradeLevelChanges();

        setFilterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const fetchEnrolledStudents = async () => {
        try {
            setLoading(true);
            const data = await getAllEnrolledStudents(filterData);
            setEnrolledStudents(data);
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const fetchSchoolYearAndGradelevel = async () => {
        try {
            setLoading(true);
            const data = await getSchoolyears();
            setSchoolYear(data[0]._id);
            const data2 = await getGradeLevels();
            setGradeLevel(data2[0]._id);
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEnrolledStudents();
    }, []);

    useEffect(() => {
        fetchSchoolYearAndGradelevel();
    }, []);

    

    return (
        <div className="flex relative flex-col flex-1 min-h-0 w-full p-4">
            <div className="w-full flex items-center justify-between mb-2">
                <h1 className="text-2xl font-semibold text-[#030ff3]">
                    Enrollments
                </h1>
                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 mr-4 px-4 py-2 rounded shadow-blue-900 text-white bg-[#055bfa] hover:bg-blue-700 transition hover:scale-105 cursor-pointer">
                    <Plus size={20} />
                    Enroll Students
                </button>
            </div>
            <div className="flex flex-1 bg-[#ccc1c1] rounded min-h-0">
                <div className="flex flex-1 flex-col m-2 rounded overflow-auto p-2 gap-2  ">

                    <div className="flex-1  rounded flex-col flex ">
                        <div className="flex w-full items-center justify-between pb-2">
                            {/*search bar and filter*/}
                            <div className="flex flex-1 flex-row-reverse justify-between gap-2 p-2 border rounded-lg bg-white shadow-sm">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Search
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Search student..."
                                            className="w-full pl-10 pr-3 py-1 border rounded-md"
                                        />
                                    </div>

                                    <button className="px-4 py-1 bg-blue-700 text-white rounded-md hover:bg-blue-600">
                                        Search
                                    </button>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">

                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-medium text-blue-700">
                                            School Year
                                        </label>
                                       { <select className="px-2 py-1 border rounded-md">
                                            <option value="">All</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                        </select>}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-medium text-blue-700">
                                            Grade Level
                                        </label>
                                        <select className="px-2 py-1 border rounded-md">
                                            <option>All</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-medium text-blue-700">
                                            Section
                                        </label>
                                        <select className="px-2 py-1 border rounded-md">
                                            <option>All</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-medium text-blue-700">
                                            Semester
                                        </label>
                                        <select className="px-2 py-1 border rounded-md">
                                            <option>All</option>
                                            <option>1st</option>
                                            <option>2nd</option>
                                        </select>
                                    </div>

                                    <button className="flex items-center gap-2 px-4 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600">
                                        <Filter size={18} />
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-y flex-col  w-full rounded  ">
                            <div className="grid grid-cols-[50px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_40px] py-2 px-4 bg-gray-600 text-white">
                                <div>No.</div>
                                <div>School Year</div>
                                <div>Account No.</div>
                                <div>Full Name.</div>
                                <div>Grade Level</div>
                                <div>Section</div>
                                <div>Semester</div>
                                <div>Enrolled Date</div>
                                <div className="flex items-center justify-center">Action</div>
                            </div>
                        </div>
                        {/*list of students enrolled*/}
                        <div className="flex flex-1 w-full flex-col border min-h-0 overflow-auto">
                            {enrolledStudents.length === 0 ?
                                <div className="flex flex-1 items-center justify-center">No enrolled students</div>
                                : enrolledStudents.map((enroll, index) =>
                                (<div key={enroll._id} className="grid  grid-cols-[50px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_40px] py-3 px-3 border-b hover:bg-gray-100 ">
                                    <div>{index + 1}</div>
                                    <div>{enroll.schoolyear.school_year}</div>
                                    <div>{enroll.student.account_number}</div>
                                    <div>{enroll.student.last_name}, {enroll.student.first_name}, {enroll.student.middle_name}</div>
                                    <div>{enroll.gradelevel.name}</div>
                                    <div>{enroll.section.name}</div>
                                    <div>{enroll.school_sem}</div>
                                    <div>{dateFormatter(enroll.createdAt)}</div>
                                    <div className="flex items-center justify-center"><Trash2 /></div>
                                </div>))}
                        </div>
                    </div>
                </div>
            </div>
            {openModal && <EnrollStudentsModal open={openModal} setOpen={setOpenModal} />}
            {loading && <LoadingScreen loadingFor="component" />}
        </div>
    )
}

export default Enrollments;