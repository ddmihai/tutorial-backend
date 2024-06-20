import { Request, Response } from "express";
import Chapter from "../../models/TutorialChapter.model";
import mongoose from "mongoose";

export const updateChapter = async (req: Request, res: Response) => {
    const { title, content, chapterId, description } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(chapterId)) {
            return res.status(400).json({ message: "Invalid chapter ID" });
        }

        const chapter = await Chapter.findById(chapterId);
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }

        // Check if the fields are provided and are valid before updating
        if (title && title.trim().length >= 4) {
            chapter.title = title;
        }

        if (content && content.trim().length >= 4) {
            chapter.content = content;
        }

        if (description && description.trim().length >= 4) {
            chapter.description = description;
        }

        await chapter.save();

        return res.status(200).json({ message: "Chapter updated successfully", chapter });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal server error", error });
    }
};
