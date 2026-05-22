import { Schema, model } from "mongoose";

const gradeLevelSchema = new Schema<IGradeLevel>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export const GradeLevel = model<IGradeLevel>(
    "GradeLevel",
    gradeLevelSchema
);