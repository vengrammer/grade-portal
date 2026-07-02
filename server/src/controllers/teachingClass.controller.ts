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

export const getAllAssignTeachers  = async (req: Request, res:Response) => {
  
  const {
   school_year_id,
   subject_id,
   search_text,
  } = req.query;

  const match: Record<string, string> = {}

  if(school_year){
    match.school_year_id = new Types.ObjectId(school_year_id)
  }

    if(subject_id){
    match.subject_id = new Types.ObjectId(subject_id)
  }
  const search = typeof search_text === "string" ? search_text.trim() : "";

  
  try {
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: "Internal Server Error"});
  }
}