import type { TeacherPayload } from "../types/user.type";
import { api } from "../utils/api";

export const getTeachers = async (): Promise<TeacherPayload[]> => {
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
        throw data;
    }
    return data;
};

export const addTeacher = async (
    teacherData: TeacherPayload
) => {
    const response = await fetch(`${api}/teacher`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(teacherData),
    });

    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
        throw new Error("Server error. Please try again later.");
    }

    const data = await response.json();

    if (!response.ok) {
        throw data;
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
        throw data;
    }
    return data;
};