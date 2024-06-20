import mongoose from "mongoose";

const chapterModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    attachments: {
        type: [String]
    },

    tutorial: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutorial",
        required: true
    }
});


const Chapter = mongoose.model("Chapter", chapterModel);
export default Chapter;