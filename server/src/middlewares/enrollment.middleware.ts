import { body } from "express-validator";

export const validateFindUserNotEnrolled = [
    body("school_year_id")
        .notEmpty()
        .withMessage("Select a school year")
        .isMongoId()
        .withMessage("Invalid school year ID"),

    body("grade_level_id")
        .notEmpty()
        .withMessage("Select a grade level")
        .isMongoId()
        .withMessage("Invalid grade level ID"),

    body("section_id")
        .notEmpty()
        .withMessage("Select a section")
        .isMongoId()
        .withMessage("Invalid section ID"),

    body("school_sem")
        .notEmpty()
        .withMessage("Select a semester")
        .isIn(["1st", "2nd"])
        .withMessage("Semester must be 1st or 2nd only"),
];