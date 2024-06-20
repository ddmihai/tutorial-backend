import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;

        await mongoose.connect(uri as string);

        if (mongoose.ConnectionStates.connected) {
            console.log('Connected to MongoDB');
        }

        if (mongoose.ConnectionStates.disconnected) {
            console.log('Disconnected from MongoDB');
        }

        else if (mongoose.ConnectionStates.disconnected) {
            console.log('Disconnected from MongoDB');
        }
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error instanceof Error && error.message);
        process.exit(1);
    }
};

export default connectDB;
