import { api } from "../utils/api";
import type { SubjectType } from "../types/subjects.type";

export const getSubjects = async (): Promise<SubjectType[]>  => {
    const response = await fetch(`${api}/subject`, {
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
}

export const addSubjects = async (name: string, description: string) => {
    const response = await fetch(`${api}/subject`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
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
}