import { Request, Response, NextFunction } from "express";

export function errorHandler(error: any, _req: Request, res: Response, _next: NextFunction) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        message: error.message || "Internal Server Error",
    });
}