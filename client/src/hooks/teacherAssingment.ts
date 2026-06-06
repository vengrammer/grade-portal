import { api } from "../utils/api";

interface ITeacherAssignment {
    school_year_id: string,
    section_id: string,
    subject_id: string,
    teacher_id: string
}

export const assingTeacher = async ({school_year_id, section_id, subject_id, teacher_id}: ITeacherAssignment) => {
    const response = await fetch(`${api}/teacherassignment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
        , body: JSON.stringify({ school_year_id, section_id, subject_id, teacher_id })
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