import { Enrollment } from "../models/Enrollment";
import { Types } from "mongoose";
import { Request, Response } from "express";
import { User } from "../models/User";

interface IEnrollmentParams {
  school_year_id: string;
  grade_level_id: string;
  school_sem: string;
  section_id: string;
  student_selected: string[];
}

export async function getAvailableStudentsForEnrollment(req: Request, res: Response) {
  try {
    const { school_year_id, school_sem, section_id } = req.query;

    if (typeof school_year_id !== "string" || typeof school_sem !== "string" || typeof section_id !== "string") {
      return res.status(400).json({
        message: "Invalid query parameters",
      });
    }

    const students = await User.aggregate([
      {
        $match: {
          role: "student",
        },
      },

      {
        $lookup: {
          from: "enrollments",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$account_id", "$$userId"] },
                    { $eq: ["$school_year_id", new Types.ObjectId(school_year_id)] },
                    { $eq: ["$school_sem", school_sem] },
                    { $eq: ["$section_id", new Types.ObjectId(section_id)] },
                  ],
                },
              },
            },
          ],
          as: "enrollment",
        },
      },

      {
        $match: {
          enrollment: { $size: 0 },
        },
      },
    ]);

    return res.status(200).json(students);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function enrollStudents(req: Request, res: Response) {
  try{
    const { school_year_id, grade_level_id, school_sem, section_id, student_selected } = req.body as IEnrollmentParams;
    const enrollstudents = await Enrollment.insertMany(student_selected.map((student_id) => ({
      account_id: new Types.ObjectId(student_id),
      school_year_id: new Types.ObjectId(school_year_id),
      grade_level_id: new Types.ObjectId(grade_level_id),
      school_sem: school_sem,
      section_id: new Types.ObjectId(section_id),
    })))

    if (enrollstudents) {
      return res.status(200).json({ message: "Students enrolled successfully" });
    } else {
      return res.status(400).json({ message: "Failed to enroll students" });
    }
  }catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}