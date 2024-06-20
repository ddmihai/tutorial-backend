import { Request, Response } from "express";
import Tutorial from "../../models/Tutorials.model";
import { isValidObjectId } from "mongoose";
import Chapter from "../../models/TutorialChapter.model";



export const deleteTutorial = async (req: Request, res: Response) => {
    const { tutorialId } = req.params;

    try {
        if (!isValidObjectId(tutorialId)) {
            return res.status(400).json({ message: 'Invalid tutorial ID' });
        }


        const tutorial = await Tutorial.findByIdAndDelete(tutorialId);
        await Chapter.deleteMany({ tutorial: tutorialId });



        return res.status(200).json({ message: 'Tutorial deleted successfully', tutorial });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting tutorial', error });
    }
}