
import type {
    UserPayload, UserType
} from "../types/user.type";
import { api } from "../utils/api";

type roleType = "teacher" | "student" | "admin";

export const getUsersByRole = async (role: roleType): Promise<UserType[]> => {
    const response = await fetch(`${api}/users?role=${role}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
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

export const addAccount = async (
    userData: UserPayload
) => {
    const response = await fetch(`${api}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
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