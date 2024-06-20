import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        trim: true,
        lowercase: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
});


// Use he pre save method to hash password
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password') && this.password.length > 8) {
            this.password = await bcrypt.hash(this.password, 8);
        }
        else if (this.isModified('password')) {
            const error = new Error('Password must be at least 8 characters long');
            next(error);
            return;
        }
        next();
    } catch (error) {
        next(error as Error);
    }
});



export default mongoose.model('User', userSchema);