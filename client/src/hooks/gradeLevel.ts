import { api } from "../utils/api";
import type { GradeLevel } from "../types/gradeLevel";



export const addGradeLevel = async (name: string): Promise<GradeLevel> => {
    const response = await fetch(`${api}/gradelevel`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });

    if (!response.ok) {
        const message = "Failed to add grade level";
        throw new Error(message);
    }
    return response.json();
}

//get all grade levels
export const getGradeLevels = async (): Promise<GradeLevel[]> => {
    const response = await fetch(`${api}/gradelevel`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        const message = "Failed to fetch grade levels";
        throw new Error(message);
    }
    return response.json();
};

