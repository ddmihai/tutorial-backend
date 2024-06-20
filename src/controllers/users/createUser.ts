import UserModel from "../../models/User.model";
import { NextFunction, Request, Response } from "express";


export const createuser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        const existingUSer = await UserModel.findOne({ email });
        if (existingUSer)
            return res.status(400).json({ message: "User already exists" });

        if (!password || password.length < 8)
            return res.status(400).json({ message: "Password must be at least 8 characters long" });

        const createdUser = await UserModel.create({ name, email, password });
        if (createdUser)
            return res.status(201).json({ message: "User created successfully" });


        // Fallback in case user creation fails for an unexpected reason
        return res.status(500).json({ message: "Failed to create user" });
    }


    catch (error) {
        console.log(error);
        next(error);
    }
};

