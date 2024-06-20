import { Request, Response } from "express";
import mongoose from "mongoose";
import Chapter from "../../models/TutorialChapter.model";




export const getIndividualChapter = async (req: Request, res: Response) => {
    try {
        const { chapterId } = req.params;

        // Check if chapterId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(chapterId)) {
            return res.status(400).json({ message: "Invalid chapter ID" });
        }

        // Find the chapter by ID
        const chapter = await Chapter.findById(chapterId);

        // If chapter not found, return 404
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }

        // Return the found chapter
        return res.status(200).json(chapter);
    } catch (error) {
        console.error("Error fetching chapter:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
