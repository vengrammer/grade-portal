import { Request, Response, NextFunction } from "express";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    console.error(error);

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        message: error.message || "Internal Server Error",
    });
}