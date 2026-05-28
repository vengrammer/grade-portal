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

    body("contact_number")
        .notEmpty()
        .withMessage("Contact number is required")
        .isMobilePhone("en-PH")
        .withMessage("Invalid contact number"),

    body("address")
        .notEmpty()
        .withMessage("Address is required"),

    body("birth_date")
        .notEmpty()
        .withMessage("Birth date is required"),

    body("profile_picture")
        .optional()
        .isURL()
        .withMessage("Profile picture must be a valid URL"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body("gender")
        .notEmpty()
        .isIn(["male", "female"])
        .withMessage("Gender must be male or female"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    body("password_confirmation")
        .notEmpty()
        .withMessage("Password confirmation is required")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
];

export { validateTeacherBeforeSave };