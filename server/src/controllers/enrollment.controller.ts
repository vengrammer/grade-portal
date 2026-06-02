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


export async function getEnrollStudents(req: Request, res: Response) {
  const {
    school_year_id,
    grade_level_id,
    school_sem,
    section_id,
    search_text,
  } = req.query;

  //validation
  if (!school_year_id || typeof school_year_id !== "string") {
    return res.status(400).json({ message: "School year is required" });
  }

  //ganito ang way pag d sure kung ilan ang magigin params sa query
  const match: any = {
    school_year_id: new Types.ObjectId(school_year_id),
    status: "enrolled",
  };

  if (grade_level_id && typeof grade_level_id === "string") {
    match.grade_level_id = new Types.ObjectId(grade_level_id);
  }

  if (school_sem && typeof school_sem === "string") {
    match.school_sem = school_sem;
  }

  if (section_id && typeof section_id === "string") {
    match.section_id = new Types.ObjectId(section_id);
  }

  //this make sure na hinde undefined ang magiging na params sa query
  const search = typeof search_text === "string" ? search_text.trim() : "";

  try {
    const enrollStudents = await Enrollment.aggregate([
      {
        $match: match,
      },

      {
        $lookup: {
          from: "users",
          localField: "account_id",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $unwind: {
          path: "$student",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "gradelevels",
          localField: "grade_level_id",
          foreignField: "_id",
          as: "gradelevel",
        },
      },
      {
        $unwind: {
          path: "$gradelevels",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "sections",
          localField: "section_id",
          foreignField: "_id",
          as: "section",
        },
      },
      {
        $unwind: {
          path: "$section",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project:{
          _id: 1,
          "student.account_number": 1,
          "student.first_name": 1,
          "student.last_name": 1,
          "student.middle_name": 1,
          "gradelevel.name": 1,
          "section.name": 1,
          created_at: 1
        }
      },
      ...(search
        ? [
            {
              $match: {
                $or: [
                  {
                    "student.first_name": {
                      $regex: search,
                      $options: "i",
                    },
                  },
                  {
                    "student.last_name": {
                      $regex: search,
                      $options: "i",
                    },
                  },
                  {
                    "student.middle_name": {
                      $regex: search,
                      $options: "i",
                    },
                  },
                  {
                    "student.account_number": {
                      $regex: search,
                      $options: "i",
                    },
                  },
                ],
              },
            },
          ]
        : []),
    ]);

    return res.status(200).json(enrollStudents);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getAvailableStudentsForEnrollment(req: Request, res: Response) {
  try {
    const { school_year_id, school_sem } = req.query;


    if (typeof school_year_id !== "string" || typeof school_sem !== "string") {
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

  try {

    const { school_year_id, grade_level_id, school_sem, section_id, student_selected } = req.body as IEnrollmentParams;

    await Enrollment.insertMany(
      student_selected.map((student_id) => ({
        account_id: new Types.ObjectId(student_id),
        school_year_id: new Types.ObjectId(school_year_id),
        grade_level_id: new Types.ObjectId(grade_level_id),
        school_sem,
        section_id: new Types.ObjectId(section_id),
      }))
    );

    return res.status(200).json({
      message: "Students enrolled successfully",
    });

  } catch (error: any) {

    if (error.code === 11000) {
      return res.status(400).json({
        message: "One or more students are already enrolled for this school year and semester",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
}
