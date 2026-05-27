import { Request, Response } from "express";
import { Section } from "../models/Section";
import { GradeLevel } from "../models/GradeLevel";
import { Types } from "mongoose";

interface ISection {
    name: string;
    grade_level_id: Types.ObjectId;
}


export async function getSections(_req: Request, res: Response) {
    try {
        const sections = await Section.aggregate([
            {
                $lookup: {
                    from: "gradelevels",
                    localField: "grade_level_id",
                    foreignField: "_id",
                    as: "grade_level",
                },
            },
            {
                $unwind: "$grade_level",
            },
            {
                $sort: { "grade_level.name": 1}
            }
        ]);


        res.status(200).json(sections);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function addSection(req: Request, res: Response) {
    try {
        const { name, grade_level_id } = req.body as ISection;

        if (!name || !grade_level_id) {
            return res.status(400).json({ message: "Please enter a section name and grade level" });
        }

        const gradeLevel = await GradeLevel.findById(grade_level_id);
        if (!gradeLevel) {
            return res.status(404).json({ message: "Grade level not found" });
        }
        const existingSection = await Section.findOne({ name, grade_level_id });
        if (existingSection) {
            return res.status(400).json({ message: "Section already exists" });
        }
        const newSection = await Section.create({ name, grade_level_id: new Types.ObjectId(grade_level_id) });
        res.status(201).json({ section: newSection, message: "Section added successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}