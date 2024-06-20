import UserModel from "../../models/User.model";
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs';



export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password with bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create a session with the user details. Use TS for extending session data
        (req.session as any).user = {
            _id: user._id,
            name: user.name,
            email: user.email
        };

        req.session.save()
        return res.status(200).json({ message: "Login successful" });
    }


    catch (error) {
        console.log(error)
        next(error);
    }
}