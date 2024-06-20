import { Request, Response } from "express";
import Tutorial from "../../models/Tutorials.model";
import Chapter from "../../models/TutorialChapter.model";
import { isValidObjectId } from "mongoose";



export const getTutorialWhole = async (req: Request, res: Response) => {
    try {
        const { tutorialId } = req.params;

        const tutorial = await Tutorial.findById(tutorialId);

        if (!isValidObjectId(tutorial)) {
            return res.status(404).json({ message: 'Tutorial not found' });
        }

        const chapterList = await Chapter.find({ tutorial: tutorialId });
        return res.status(200).json({
            tutorial,
            chapterLists: chapterList
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}