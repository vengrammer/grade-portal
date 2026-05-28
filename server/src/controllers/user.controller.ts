import { User } from "../models/User";
import { Request, Response } from "express";


interface ITeacher {
    first_name: string;
    last_name: string;
    middle_name: string;
    profile_picture?: string;
    gender: string;
    birth_date: Date;
    contact_number: string;
    address: string;
    email: string;
    password: string;
    teacher_number: string;
}

// Generate a unique random code for any user number
const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < 7; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
};

export const getGeneratedNumber = async (req: Request, res: Response) => {
    try {
        const role = req.query.role as string;

        let field =
            role === "teacher"
                ? "teacher_number"
                : role === "student"
                    ? "student_number"
                    : "admin_number";

        let code = generateCode();

        let exists = await User.findOne({ [field]: code });

        while (exists) {
            code = generateCode();
            exists = await User.findOne({ [field]: code });
        }

        res.status(200).json({ number: code });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getTeachers = async (_req: Request, res: Response) => {
    try {
        const teachers = await User.find({ role: "teacher" });
        res.status(200).json(teachers);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const addTeacher = async (req: Request, res: Response) => {
    const role = "teacher";
    const { first_name,
        last_name,
        middle_name,
        address,
        birth_date,
        gender,
        contact_number,
        email, password,
        profile_picture,
        teacher_number }: ITeacher = req.body;
    try {
        const teacherData: any = {
            first_name,
            last_name,
            middle_name,
            email,
            password,
            role,
            teacher_number,
            address,
            gender,
            birth_date,
            contact_number,
        };
        
        if (profile_picture) {
            teacherData.profile_picture = profile_picture;
        }
        const teacher = await User.create(teacherData);
        res.status(201).json({ teacher, message: "Teacher added successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};