import Tutorial from "../../models/Tutorials.model";
import { NextFunction, Request, Response } from "express";



export const getTutorialsByUserID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if session and user object exist
        const session = req.session as any;
        if (!session || !session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Retrieve user ID from session
        const userId = session.user._id;

        // Fetch tutorials by user ID
        const tutorials = await Tutorial.find({ author: userId }).exec();

        // Return tutorials in response
        return res.status(200).json({ tutorials });
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
