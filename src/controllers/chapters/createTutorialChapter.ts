import { Request, Response } from "express";
import Chapter from "../../models/TutorialChapter.model";


export const createTutorialChapter = async (req: Request, res: Response) => {
    try {
        const { title, description, content, tutorial } = req.body;

        // Check for null values and for empty values wehn trimmed
        if (!title || !description || !content || !tutorial)
            return res.status(400).json({ error: "Please fill all the fields" })
        if (title.trim() === "" || description.trim() === "" || content.trim() === "")
            return res.status(400).json({ error: "Please fill all the fields" })

        // Create a new tutorial chapter
        const newTutorialChapter = new Chapter({
            title,
            description,
            content,
            tutorial
        });

        await newTutorialChapter.save();
        return res.status(201).json({ message: "Tutorial chapter created successfully" })
    }

    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message, name: error.name })
        }

        return res.status(500).json({ error: "Something went wrong in the create tutorial controller" })
    }
}