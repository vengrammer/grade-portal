import { GradingPeriod } from "../models/GradingPeriod";
import { Request, Response } from "express";

interface IGradingPeriod {
    name: string
}
export const getGradingPeriods = async (_req: Request, res: Response) => {
    try {
        const gradingPeriodData = [
            "1st Grading",
            "2nd Grading",
            "3rd Grading",
            "4th Grading",
        ];

        let gradingPeriods = await GradingPeriod.find();

        if (gradingPeriods.length === 0) {
            await GradingPeriod.insertMany(
                gradingPeriodData.map((name) => ({ name }))
            );

            gradingPeriods = await GradingPeriod.find();
        }

        return res.status(200).json(gradingPeriods);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
