import Chapter from "../../models/TutorialChapter.model";
import { Request, Response } from "express";

export const getChaptersFromTutorialId = async (req: Request, res: Response) => {
    const { tutorialId } = req.params;
    const chapters = await Chapter.find({ tutorial: tutorialId });
    res.status(200).json(chapters);
};
