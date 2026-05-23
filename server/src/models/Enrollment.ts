import { Schema, model } from "mongoose";

const enrollmentSchema = new Schema<IEnrollment>(
    {
        student_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        school_year_id: {
            type: Schema.Types.ObjectId,
            ref: "SchoolYear",
            required: true,
        },

        grade_level_id: {
            type: Schema.Types.ObjectId,
            ref: "GradeLevel",
            required: true,
        },

        section_id: {
            type: Schema.Types.ObjectId,
            ref: "Section",
            required: true,
        },

        status: {
            type: String,
            enum: ["enrolled", "completed", "dropped", "transferred"],
            default: "enrolled",
        },
    },
    { timestamps: true }
);

/*
🔥 IMPORTANT FIX:
Prevent duplicate enrollment per year AND section
*/
enrollmentSchema.index(
    { student_id: 1, school_year_id: 1, section_id: 1 },
    { unique: true }
);

export const Enrollment = model<IEnrollment>("Enrollment",enrollmentSchema);