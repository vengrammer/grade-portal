import { Types, Document } from "mongoose";

declare global {

    //GLOBAL TYPES
    type Role = "admin" | "teacher" | "student";
    type EnrollmentStatus =
        | "enrolled"
        | "completed"
        | "dropped"
        | "transferred";
    type GradingPeriodType =
        | "1st Grading"
        | "2nd Grading"
        | "3rd Grading"
        | "4th Grading";

   
    //USER
    interface IUser extends Document {
        _id?: Types.ObjectId;

        first_name: string;
        last_name: string;
        middle_name?: string;

        gender: string;
        birth_date: Date;
        address: string;
        profile_picture?: string;

        contact_number: string;
        email: string;
        password: string;

        role: Role;
        is_active: boolean;

        account_number: string;

        createdAt?: Date;
        updatedAt?: Date;
    }

    // GRADE LEVEL
    interface IGradeLevel extends Document {
        _id?: Types.ObjectId;
        name: string;
        createdAt?: Date;
        updatedAt?: Date;
    }

    
    //SECTION
    interface ISection extends Document {
        _id?: Types.ObjectId;

        grade_level_id: Types.ObjectId | IGradeLevel;

        name: string;

        createdAt?: Date;
        updatedAt?: Date;
    }

    
    // SUBJECT
    interface ISubject extends Document {
        _id?: Types.ObjectId;

        name: string;

        description?: string;

        createdAt?: Date;
        updatedAt?: Date;
    }

    
    // SCHOOL YEAR
    interface ISchoolYear extends Document {
        _id?: Types.ObjectId;

        school_year: string;

        is_active: boolean;

        createdAt?: Date;
        updatedAt?: Date;
    }


    //GRADING PERIOD
    interface IGradingPeriod extends Document {
        _id?: Types.ObjectId;

        name: GradingPeriodType;

        createdAt?: Date;
        updatedAt?: Date;
    }

    // ENROLLMENT
    interface IEnrollment extends Document {
        _id?: Types.ObjectId;

        student_id: Types.ObjectId | IUser;

        school_year_id: Types.ObjectId | ISchoolYear;

        grade_level_id: Types.ObjectId | IGradeLevel;

        section_id: Types.ObjectId | ISection;

        status: EnrollmentStatus;

        createdAt?: Date;
        updatedAt?: Date;
    }

  
    // TEACHER CLASS ASSIGNMENT
    interface ITeachingClass extends Document {
        _id?: Types.ObjectId;

        teacher_id: Types.ObjectId | IUser;

        subject_id: Types.ObjectId | ISubject;

        section_id: Types.ObjectId | ISection;

        school_year_id: Types.ObjectId | ISchoolYear;

        is_adviser?: boolean;

        createdAt?: Date;
        updatedAt?: Date;
    }

    
    // GRADE
    interface IGrade extends Document {
        _id?: Types.ObjectId;

        enrollment_id: Types.ObjectId | IEnrollment;

        teaching_class_id: Types.ObjectId | ITeachingClass;

        grading_period_id:
            | Types.ObjectId
            | IGradingPeriod;

        grade: number;

        remarks?: string;

        createdAt?: Date;
        updatedAt?: Date;
    }
}

export {};