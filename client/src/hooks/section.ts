import { api } from "../utils/api"
import type { SectionType } from "../types/sections.type"


export const getSections = async (grade_level_id?: string): Promise<SectionType[]> => {

    //make a optional filter
    const url = grade_level_id ? `${api}/section?grade_level_id=${grade_level_id}`:  `${api}/section`;

    const response = await fetch(url, {
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

export const addSection = async (name: string, grade_level_id: string) => {
    const response = await fetch(`${api}/section`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
        , body: JSON.stringify({ name, grade_level_id })
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