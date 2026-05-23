import { Schema, model } from "mongoose";

const subjectSchema = new Schema<ISubject>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

export const Subject = model<ISubject>("Subject", subjectSchema);