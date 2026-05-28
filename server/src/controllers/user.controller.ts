import { User } from "../models/User";
import { Request, Response } from "express";


interface TeacherPayload {
  teacher_number: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  gender: string;
  address: string;
  birth_date: string;
  contact_number: string;
  email: string;
  password: string;
  profile_picture?: string;
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
  try {
    const teacherData: TeacherPayload = {
      ...req.body,
      role: "teacher",
    };

    const teacher = await User.create(teacherData);

    res.status(201).json({
      teacher,
      message: "Teacher added successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};