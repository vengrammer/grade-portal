import { Schema, model } from "mongoose";

const sectionSchema = new Schema<ISection>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        grade_level_id: {
            type: Schema.Types.ObjectId,
            ref: "GradeLevel",
            required: true,
        },
    },
    { timestamps: true }
);

/*
Prevent duplicate section names per grade level
Example: Grade 7 - Rizal should not duplicate
*/
sectionSchema.index(
    { name: 1, grade_level_id: 1 },
    { unique: true }
);

export const Section = model<ISection>("Section", sectionSchema);