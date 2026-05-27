import { Request, Response } from "express";
import { Subject } from "../models/Subject";


interface ISubject {
    name: string;
    description: string;
}

export async function getSubjects(_req: Request, res: Response) {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function addSubject(req: Request, res: Response) {
    try {
        const { name, description } = req.body as ISubject;
        if (!name) {
            return res.status(400).json({ message: "Please enter a subject name" });
        }
        const existingSubject = await Subject.findOne({ name });
        if (existingSubject) {
            return res.status(400).json({ message: "Subject already exists" });
        }
        const newSubject = await Subject.create({ name, description });
        res.status(201).json({ subject: newSubject, message: "Subject added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
