
import { api } from "../utils/api";
import type { UserType } from "../types/user.type";

type sem = "1st" | "2nd";


interface IGetAvailableStudentsForEnrollment {
    school_year_id: string;
    school_sem: sem;
}

interface IEnrollStudents {
    school_year_id: string;
    grade_level_id: string;
    school_sem: sem;
    section_id: string;
    student_selected: string[];
}


export const getAvailableStudentsForEnrollment = async ({ school_year_id, school_sem}: IGetAvailableStudentsForEnrollment): Promise<UserType[]> => {

    const url = `${api}/getnotenrolledstudents?school_year_id=${school_year_id}&school_sem=${school_sem}`;
    const response = await fetch(`${url}`, {
        method: "GET",
        credentials: "include",
    });

    // check if the content type is application/json... meaning it will not show an html error page
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server error. Please try again later.");
    }

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }
    return data;
}

export const enrollStudents = async ({ school_year_id, grade_level_id, school_sem, section_id, student_selected }: IEnrollStudents) => {

    const response = await fetch(`${api}/enrollment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
        , body: JSON.stringify({ school_year_id, grade_level_id, school_sem, section_id, student_selected }),
    });

    // check if the content type is application/json... meaning it will not show an html error page
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server error. Please try again later.");
    }

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }
    return data;
}
