import { Schema, model } from "mongoose";

const enrollmentSchema = new Schema<IEnrollment>(
    {
        account_id: {
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

        school_sem: {
            type: String,
            enum: ["1st", "2nd"],
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
Prevent duplicate enrollment per year AND section
*/

enrollmentSchema.index(
    {
        school_year_id: 1,
        school_sem: 1,
        account_id: 1,
    },
    { unique: true }
);

export const Enrollment = model<IEnrollment>("Enrollment",enrollmentSchema);