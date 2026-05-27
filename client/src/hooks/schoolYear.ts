import { api } from "../utils/api";
import type { SchoolYearType } from "../types/schoolYear.type";


export const getSchoolyears = async (): Promise<SchoolYearType[]> => {
    const response = await fetch(`${api}/schoolyear`, {
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

export const addSchoolYear = async () => {
    const response = await fetch(`${api}/schoolyear`, {
        method: "POST",
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