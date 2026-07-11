import { LoaderCircleIcon, Plus, Search, Trash2 } from "lucide-react";


import AssignTeacherModal from "../modal/AssignTeacherModal";
import React, { useEffect, useState } from "react";
    
import { getAllAssignTeacher } from "../../hooks/teacherAssingment";

import { toast } from "react-toastify";
import LoadingScreen from "../shared/LoadingScreen";
import { dateFormatter } from "../../utils/dateFormatter";


import { getSchoolyears } from "../../hooks/schoolYear";

import type { SchoolYearType } from "../../types/schoolYear.type";
import type { SubjectType } from "../../types/subjects.type";


interface ITeachingClass {
    _id: string,
        createdAt: string,
        teacher: {
          _id: string,
          first_name: string,
          middle_name: string,
          last_name:string,
          account_number:string,
        },
        schoolyear: {
          school_year:string,
        },    
        section: {
          name:string,
        }, 
        subject: {
            name:string,
        },
}

interface IFilter {
    school_year_id?: string;
    subject_id?:string;
    search_text?: string;
}


function TeachingClass() {

    //filter data
    const [schoolYear, setSchoolYear] = useState<SchoolYearType[]>([]);
    const [subject, setSubject] = useState<SubjectType[]>([])

    const [openModal, setOpenModal] = useState(false);
    const [allAssignteacher, setAllAssignTeacher] = useState<ITeachingClass[]>([]);
    const [loading, setLoading] = useState(false);

    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [loadingTable, setLoadingTable] = useState(false);

    const [filterData, setFilterData] = useState<IFilter>({
        school_year_id: "",
        subject_id:"",
        search_text: "",
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const fetchAssignTeacher = async (filters: IFilter) => {
        try {
            setLoadingTable(true);
            const data = await getAllAssignTeacher(filters);
            setAllAssignTeacher(data);
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoadingTable(false);
        }
    };

    //debounce search delay a search by one second 
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(filterData.search_text?.trim() || "");
        }, 1000);

        return () => clearTimeout(timer);
    }, [filterData.search_text]);

    useEffect(() => {
        fetchAssignTeacher({
            ...filterData,
            search_text: debouncedSearch,
        });
    }, [
        debouncedSearch,
        filterData.school_year_id,
        filterData.subject_id,
    ]);


    const fetchSchoolYearAndSubject = async () => {
        try {
            setLoading(true);
            const data = await getSchoolyears();
            setSchoolYear(data);
            const data2 = await getSubjects();
            setSubject(data2);
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSchoolYearAndSubject();
        fetchAssignTeacher({
            ...filterData,
            search_text: debouncedSearch,
        });
    }, []);


    return (
        <div className="flex relative flex-col flex-1 min-h-0 w-full p-4">
            <div className="w-full flex items-center justify-between mb-2">
                <h1 className="text-2xl font-semibold text-[#030ff3]">
                    Teaching Class
                </h1>
                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 mr-4 px-4 py-2 rounded shadow-blue-900 text-white bg-[#055bfa] hover:bg-blue-700 transition hover:scale-105 cursor-pointer">
                    <Plus size={20} />
                    Assign Teachers
                </button>
            </div>
            <div className="flex flex-1 bg-[#ccc1c1] rounded min-h-0">
                <div className="flex flex-1 flex-col m-2 rounded overflow-auto p-2 gap-2  ">

                    <div className="flex-1  rounded flex-col flex ">
                        <div className="flex w-full items-center justify-between pb-2">
                            {/*search bar and filter*/}
                            <div className="flex flex-1 flex-row-reverse  justify-between gap-90 p-2 border rounded-lg bg-white shadow-sm">
                                <div className="flex gap-2 flex-1 ">
                                    <div className="relative flex-1">
                                        <Search
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            onChange={(e) => setFilterData({ ...filterData, search_text: e.target.value })}
                                            type="text"
                                            placeholder="Search student by account number or fullname..."
                                            className="w-full pl-10 pr-3 py-1 border rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">

                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-medium text-blue-700">
                                            School Year
                                        </label>
                                        <select
                                            name="school_year_id"
                                            onChange={handleFilterChange}
                                            className="px-2 py-1 border rounded-md">
                                            <option value="">All</option>
                                            {schoolYear.length === 0 ? <option disabled>No School Year</option>
                                                : schoolYear.map((schoolYear, index) => (
                                                    <option key={index} value={schoolYear._id}>{schoolYear.school_year}</option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-medium text-blue-700">
                                            Grade Level
                                        </label>
                                        <select
                                            name="grade_level_id"
                                            onChange={handleFilterChange}
                                            className="px-2 py-1 border rounded-md">
                                            <option value="">All</option>
                                            {gradeLevel.length === 0 ? <option disabled>No Grade Level</option>
                                                : gradeLevel.map((grade, index) => (
                                                    <option key={index} value={grade._id}>{grade.name}</option>
                                                ))}
                                        </select>
                                    </div>

                                    

                                    
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
                        {loadingTable ? (<div className="flex flex-col gap-2 flex-1 items-center justify-center"><LoaderCircleIcon size={70} className="animate-spin text-blue-500" /><p>Loading enrolled students</p></div>)
                            : (<div className="flex flex-1 w-full flex-col border min-h-0 overflow-auto">
                                {enrolledStudents.length === 0 ?
                                    <div className="flex flex-1 items-center justify-center">No enrolled students found</div>
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
                            </div>)}
                    </div>
                </div>
            </div>
            {openModal && <AssignTeacherModal open={openModal} setOpen={setOpenModal} />}
            {loading && <LoadingScreen loadingFor="component" />}
        </div>
    )
}

export default TeachingClass;