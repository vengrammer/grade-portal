
import { SchoolYear } from "../models/SchoolYear";
import { Request, Response } from "express";



export const getSchoolyears = async (_req: Request, res: Response) => {
    try {
        const schoolyears = await SchoolYear.find();

        const startedDate = 2025;
        const endDate = 2026;

        if (schoolyears.length === 0) {
            const newSchoolYear = await SchoolYear.create({ school_year: `${startedDate}-${endDate}`, is_active: true });
            res.status(201).json({ schoolyear: newSchoolYear, message: "School year added successfully" });
        } else {
            res.status(200).json(schoolyears);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const addSchoolYear = async (_req: Request, res: Response) => {
    try {
        const lastSchoolYearData = await SchoolYear.findOne().sort({ createdAt: -1 });
        const lastSchoolYearDate = lastSchoolYearData?.school_year.split("-");
        const startedDate = Number(lastSchoolYearDate![0]) + 1;

        const endDate = Number(lastSchoolYearDate![1]) + 1;
        const newSchoolYear = await SchoolYear.create({ school_year: `${startedDate}-${endDate}`, is_active: true });
        res.status(201).json({ schoolyear: newSchoolYear, message: "School year added successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}