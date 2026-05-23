import { Schema, model } from "mongoose";

const schoolYearSchema = new Schema<ISchoolYear>(
    {
        school_year: {
            type: String,
            required: true,
            trim: true,
        },

        is_active: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

schoolYearSchema.index({ school_year: 1 }, { unique: true });

export const SchoolYear = model<ISchoolYear>("SchoolYear",schoolYearSchema);