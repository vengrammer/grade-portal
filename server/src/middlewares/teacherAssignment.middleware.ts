import { body } from "express-validator";


export const validateBeforeTeacherAssignment = [
    body("school_year_id")
        .notEmpty()
        .withMessage("Select a school year")
        .isMongoId()
        .withMessage("Invalid school year"),
    body("section_id")
        .notEmpty()
        .withMessage("Select a section")
        .isMongoId()
        .withMessage("Invalid section"),
    body("subject_id")
        .notEmpty()
        .withMessage("Select a subject")
        .isMongoId()
        .withMessage("Invalid subject"), 
    body("teacher_id")
        .notEmpty()
        .withMessage("Select a teacher")
        .isMongoId()
        .withMessage("Invalid teacher"),
]