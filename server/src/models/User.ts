import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>(
    {
        first_name: { type: String, required: true, trim: true },
        last_name: { type: String, required: true, trim: true },
        middle_name: { type: String, trim: true },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },

        role: {
            type: String,
            enum: ["admin", "teacher", "student"],
            required: true,
        },

        is_active: {
            type: Boolean,
            default: true,
        },

        student_number: {
            type: String,
            unique: true,
            sparse: true,
        },

        teacher_number: {
            type: String,
            unique: true,
            sparse: true,
        },
    },
    { timestamps: true }
);

export const User = model<IUser>("User", userSchema);