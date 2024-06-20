import { Request, Response } from "express";
import Chapter from "../../models/TutorialChapter.model";
import { isValidObjectId } from "mongoose";


export const deleteChapter = async (req: Request, res: Response) => {
    try {
        const chapter = await Chapter.findByIdAndDelete(req.params.chapterId);
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }

        if (!isValidObjectId(req.params.chapterId)) {
            return res.status(404).json({ message: "Invalid chapter Id" });
        }

        return res.status(200).json({ message: "Chapter deleted successfully" });
    }

    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};