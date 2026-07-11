import { TeachingClass } from "../models/TeachingClass";
import { Request, Response } from "express";
import { Types } from "mongoose";

interface ITeachingClass {
    teacher_id: Types.ObjectId;
    section_id: Types.ObjectId;
    school_year_id: Types.ObjectId;
    subject_id: Types.ObjectId
}

export const assingTeacher = async (req: Request, res: Response) => {
    try {
        const { teacher_id, section_id, school_year_id, subject_id } = req.body as ITeachingClass

        const response = await TeachingClass.create({ teacher_id: teacher_id, section_id: section_id, school_year_id: school_year_id, subject_id: subject_id });
        return res.status(200).json(response);
    } catch (error: any) {

        if (error.code === 11000) {
            return res.status(400).json({
                message: "This teacher is already assigned to this section, subject and school year",
            });
        }

        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

interface IGetTeachingClass {
    search_text: string,
    school_year_id: Types.ObjectId;
    subject_id: Types.ObjectId
}

export const getAllAssignTeachers  = async (req: Request, res:Response) => {
  
  const {
   school_year_id,
   subject_id,
   search_text,
  } = req.query as IGetTeachingClass;

  const match: Record<string, string> = {}

  if(school_year){
    match.school_year_id = new Types.ObjectId(school_year_id)
  }

  if(subject_id){
    match.subject_id = new Types.ObjectId(subject_id)
  }
  const search = typeof search_text === "string" ? search_text.trim() : "";
  if(search_text){
    match.search_text = search:
  }

  
  try {
    const teachingClass = await TeachingClass.aggregate([
    {
      $match: match,
    },
    {
      $lookup: {
        from: "users",
        localField: "teacher_id",
        foreignField:"_id",
        as: "teacher",
      }
    },
    {
      $unwind: {
        path: "$teacher",
        preserveNullAndEmptyArrays: true,
      }
    },
    {
      $lookup: {
        from: "schoolyears",
        localField: "school_year_id",
        foreignField: "_id",
        as: "schoolyear",
      }
    },
    {
     $unwind: {
      path: "$schoolyear",
      preserveNullAndEmptyArrays: true,
     }
    }
    ,{
      $lookup: {
        from: "subjects",
        localField: "subject_id",
        foreignField:"_id",
        as: "subject",
      }
    },{
      $unwind: {
        path: "$subject",
        preserveNullAndEmptyArrays: true,
      }
    },{
      $lookup: {
        from: "sections",
        localField: "section_id",
        foreignField: "_id",
        as: "section",
      }
    },
    {
     $unwind: {
       path: "$section",
       preserveNullAndEmptyArrays: true,
     }
    },{
      $project: {
        _id: 1,
        createdAt: 1,
        teacher: {
          _id: 1,
          first_name: 1,
          middle_name: 1,
          last_name:1,
          account_number:1,
        },
        schoolyear: {
          school_year:1,
        },    
        section: {
          name:1,
        }, 
        subject: {
            name:1,
        },
      },
    }
    ,...(search
        ? [
          {
            $match: {
              $or: [
                {
                  "teacher.first_name": {
                    $regex: search,
                    $options: "i",
                  },
                },
                {
                  "teacher.last_name": {
                    $regex: search,
                    $options: "i",
                  },
                },
                {
                  "teacher.middle_name": {
                    $regex: search,
                    $options: "i",
                  },
                },
                {
                  "teacher.account_number": {
                    $regex: search,
                    $options: "i",
                  },
                },
              ],
            },
          },
        ]
        : []),
  ])
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: "Internal Server Error"});
  }
}