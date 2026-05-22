import { Schema, model } from "mongoose";

const gradingPeriodSchema = new Schema<IGradingPeriod>(
    {
        name: {
            type: String,
            enum: [
                "1st Grading",
                "2nd Grading",
                "3rd Grading",
                "4th Grading",
            ],
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export const GradingPeriod = model<IGradingPeriod>(
    "GradingPeriod",
    gradingPeriodSchema
);