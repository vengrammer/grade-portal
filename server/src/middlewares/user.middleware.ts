import { body } from "express-validator";

const nameRegex = /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/;

const validateTeacherBeforeSave = [
    body("teacher_number")
        .notEmpty()
        .withMessage("Teacher number is required"),

    body("first_name")
        .notEmpty()
        .withMessage("First name is required")
        .matches(nameRegex)
        .withMessage("First name must only contain letters"),

    body("last_name")
        .notEmpty()
        .withMessage("Last name is required")
        .matches(nameRegex)
        .withMessage("Last name must only contain letters"),

    body("middle_name")
        .optional({ nullable: true }) 
        .matches(nameRegex)
        .withMessage("Middle name must only contain letters"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

export { validateTeacherBeforeSave };