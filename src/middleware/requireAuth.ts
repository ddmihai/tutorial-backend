import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

// Require authentication middleware. This middleware request a session to be present with the user object.
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && (req.session as any).user) {

        if (req.session && (req.session as any).user && isValidObjectId((req.session as any).user._id as string)) {
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized: Invalid user ID' });
        }
    }
    else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};


