import { api } from "../utils/api";
import type { GradeLevelType } from "../types/gradeLevel.type";



export const addGradeLevel = async (name: string) => {
    const response = await fetch(`${api}/gradelevel`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name }),
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

//get all grade levels
export const getGradeLevels = async (): Promise<GradeLevelType[]> => {
    const response = await fetch(`${api}/gradelevel`, {
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

