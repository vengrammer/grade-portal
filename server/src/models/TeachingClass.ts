import { Schema, model } from "mongoose";

const teachingClassSchema = new Schema<ITeachingClass>(
    {
        teacher_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        subject_id: {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },

        section_id: {
            type: Schema.Types.ObjectId,
            ref: "Section",
            required: true,
        },

        school_year_id: {
            type: Schema.Types.ObjectId,
            ref: "SchoolYear",
            required: true,
        },

        is_adviser: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

teachingClassSchema.index(
    { teacher_id: 1, subject_id: 1, section_id: 1, school_year_id: 1 },
    { unique: true }
);

export const TeachingClass = model<ITeachingClass>(
    "TeachingClass",
    teachingClassSchema
);