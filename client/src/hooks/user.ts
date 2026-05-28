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

export const addTeacher = async (
    accountnumber: string,
    first_name: string,
    last_name: string,
    middle_name: string,
    gender: string,
    address: string,
    birth_date: string,
    contact_number: string,
    email: string,
    profile_picture: string,
    password: string): Promise<TeacherType> => {

    const response = await fetch(`${api}/teacher`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ teacher_number: accountnumber, first_name, profile_picture, last_name, middle_name, email, password, gender, address, birth_date, contact_number }),
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