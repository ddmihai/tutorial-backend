import UserModel from "../../models/User.model";
import { NextFunction, Request, Response } from "express";

export const getUserData = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // Check if session and user ID exist
        if (!req.session || !(req.session as any).user?._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Retrieve user from the database, excluding the password field
        const user = await UserModel.findById((req.session as any).user._id).select('-password');

        // If user not found, return 404
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Return user data with status 200
        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        // Return 500 status code on server error
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
