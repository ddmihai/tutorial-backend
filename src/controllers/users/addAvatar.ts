import { NextFunction, Request, Response } from 'express';
import UserModel from '../../models/User.model';
import { unlink, stat } from 'fs/promises'; // Import unlink directly from fs.promises
import path from 'path';
import fs from 'fs';




export const addAvatar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const image = req.file;
        const userId = (req.session as any).user._id;


        // Get the user and check if the 
        const existingUser = await UserModel.findById(userId);

        if (existingUser?.avatar && existingUser.avatar.length > 0) {
            await unlink(path.join(__dirname, '..', '..', 'uploads', 'images', existingUser.avatar));
        }


        // Update user with the new User path
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { avatar: image?.filename },
            { new: true }
        ).select('-password');


        // send response
        return res.status(200).json({
            message: 'Avatar added successfully',
            data: updatedUser
        });


    } catch (error) {
        console.error('Error adding avatar:', error);
        next(error);
    }
};



async function checkIfImageExists(filename: string): Promise<boolean> {
    const imagePath = path.join(__dirname, '..', '..', 'uploads', 'images', filename);
    try {
        await stat(imagePath);
        return true; // Image exists
    }
    catch (error) {
        return false; // Image does not exist
    }
}
