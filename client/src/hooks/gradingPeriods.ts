import { api } from "../utils/api";
import type { GradingPeriodType } from "../types/gradingPeriod.type";


export const getGradingPeriods = async (): Promise<GradingPeriodType[]> => {
    const response = await fetch(`${api}/gradingperiod`, {
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