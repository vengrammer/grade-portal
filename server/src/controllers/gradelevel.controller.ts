import { Request, Response } from "express";
import { GradeLevel } from "../models/GradeLevel";

interface IGradeLevel {
    name: string;
}

export async function getGradeLevels(_req: Request, res: Response) {
    try {
        const gradeLevels = await GradeLevel.find();
        res.status(200).json(gradeLevels);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export async function addGradeLevel(req: Request, res: Response) {
    try {
        const { name } = req.body as IGradeLevel;
        if (!name) {
            return res.status(400).json({ message: "Please enter a grade level" });
        }

        const existingGradeLevel = await GradeLevel.findOne({ name });

        if (existingGradeLevel) {
            return res.status(400).json({ message: "Grade Level already exists" });
        }

        const newGradeLevel = await GradeLevel.create({ name });
        res.status(201).json({ gradeLevel: newGradeLevel, message: "Grade Level added successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export async function updateGradeLevel(req: Request, res: Response) {
    try {

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}