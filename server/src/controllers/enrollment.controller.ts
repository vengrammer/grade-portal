import { Enrollment } from "../models/Enrollment";
import { Types } from "mongoose";
import { Request, Response } from "express";
import { User } from "../models/User";
type sem = "1st" | "2nd";

interface IGetAvailableStudentsForEnrollment {
    school_year_id: Types.ObjectId,
    grade_level_id: Types.ObjectId,
    school_sem: sem,
    section_id: Types.ObjectId,
}

export async function getAvailableStudentsForEnrollment(req: Request, res: Response) {
  try {
    const { school_year_id, school_sem, section_id } = req.body as IGetAvailableStudentsForEnrollment;

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

    res.json(students);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}