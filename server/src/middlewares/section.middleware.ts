import { body } from "express-validator";

const sectionValidator = [
    body("name")
        .notEmpty()
        .withMessage("Section name is required"),

    body("grade_level_id")
        .notEmpty()
        .withMessage("Grade level ID is required")
        .isMongoId()
        .withMessage("Invalid grade level ID"),
];

export { sectionValidator };