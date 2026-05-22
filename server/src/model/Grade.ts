import { Schema, model } from "mongoose";

const gradeSchema = new Schema<IGrade>(
    {
        enrollment_id: {
            type: Schema.Types.ObjectId,
            ref: "Enrollment",
            required: true,
        },

        teaching_class_id: {
            type: Schema.Types.ObjectId,
            ref: "TeachingClass",
            required: true,
        },

        grading_period_id: {
            type: Schema.Types.ObjectId,
            ref: "GradingPeriod",
            required: true,
        },

        grade: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },

        remarks: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

/*
Prevent duplicate grade entry
*/
gradeSchema.index(
    {
        enrollment_id: 1,
        teaching_class_id: 1,
        grading_period_id: 1,
    },
    { unique: true }
);

export const Grade = model<IGrade>("Grade", gradeSchema);