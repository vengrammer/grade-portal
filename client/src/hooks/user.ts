import type { TeacherType } from "../types/user.type";
import { api } from "../utils/api";




export const getTeachers = async (): Promise<TeacherType[]> => {
    const response = await fetch(`${api}/teacher`, {
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
        throw new Error(data.message);
    }
    return data;
};

export const addTeacher = async (teacher_number: string, first_name: string, last_name: string, middle_name: string, email: string, password: string): Promise<TeacherType> => {
    const response = await fetch(`${api}/teacher`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ teacher_number, first_name, last_name, middle_name, email, password }),
    });

    // check if the content type is application/json... meaning it will not show an html error page
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server error. Please try again later.");
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
    
};

export const accountnumber = async () => {
    const response = await fetch(`${api}/accountnumber`, {
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
        throw new Error(data.message);
    }
    return data;
};