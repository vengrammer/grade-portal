import { User } from "../models/User";
import { Request, Response } from "express";




// Generate a unique random code for any user number
const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < 7; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
};

export const getGeneratedNumber = async (_req: Request, res: Response) => {
    try {
        let code = generateCode();

        let exists = await User.findOne({ account_number: code });

        while (exists) {
            code = generateCode();
            exists = await User.findOne({ account_number: code });
        }

        res.status(200).json({ number: code });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const getUsersByRole = async (req: Request, res: Response) => {
    try {

        const roleType = "teacher | student | admin";
        const { role } = req.query;

        if (role !== "teacher" && role !== "student" && role !== "admin") {
            return res.status(400).json({ message: `Role must be ${roleType}` });
        }
        
        const users = await User.find({ role: role });
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

type RoleType = "admin" | "teacher" | "student";
interface AccountPayload {
    account_number: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    gender: string;
    address: string;
    birth_date: string;
    contact_number: string;
    email: string;
    password: string;
    profile_picture?: string;
    role: RoleType;
}

export const addAccount = async (req: Request, res: Response) => {
    try {
        const existingAccount = await User.findOne({ email: req.body.email });

        if (existingAccount) {
            return res.status(400).json({
                message: "The email already exists",
            });
        }
        const accountData: AccountPayload = {
            account_number: req.body.account_number,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            middle_name: req.body.middle_name,
            gender: req.body.gender,
            address: req.body.address,
            birth_date: req.body.birth_date,
            contact_number: req.body.contact_number,
            email: req.body.email,
            password: req.body.password,
            profile_picture: req.body.profile_picture,
            role: req.body.role,
        };

        const account = await User.create(accountData);

        res.status(201).json({
            account,
            message: "Account added successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        });
    }
};