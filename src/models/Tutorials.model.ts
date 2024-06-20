import mongoose from "mongoose";



const TutorialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    subtitle: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    createdDate: {
        type: Date,
        default: Date.now
    }
})

const Tutorial = mongoose.model('Tutorial', TutorialSchema);
export default Tutorial;