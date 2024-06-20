import { Request, Response } from 'express';

export const logout = (req: Request, res: Response) => {
    try {
        // get the sessions and destroy them
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({
                    message: 'An error occurred while logging out.'
                });
            }
            res.clearCookie('session_id');
            return res.status(200).json({
                message: 'Logged out successfully.'
            });
        });
    }

    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message,
                name: error.name
            });
        }
        else {
            res.status(500).json({
                message: 'An error occurred while logging out.'
            });
        }
    }
};