import Tutorial from "../../models/Tutorials.model";
import { NextFunction, Request, Response } from "express";


export const createTutorial = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //   Get the user Id fot the author field from the session
        const userId = (req.session as any).user._id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });


        const { title, subtitle, description } = req.body;

        // Check for null values
        if (!title || !subtitle || !description) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check for empty values and less than three chatacters when trimmed
        if (title.trim().length < 3 || subtitle.trim().length < 3 || description.trim().length < 3)
            return res.status(400).json({ message: "Fields must be at least three characters" });


        const newTutorial = new Tutorial({
            title,
            subtitle,
            description,
            author: userId
        });
        const tutorial = await newTutorial.save();

        // If the tutorial had ben created, send response
        return res.status(201).json({ message: "Tutorial created successfully", tutorial });
    }


    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}