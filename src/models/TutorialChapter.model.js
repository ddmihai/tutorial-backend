"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chapterModel = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Tutorial",
        required: true
    }
});
const Chapter = mongoose_1.default.model("Chapter", chapterModel);
exports.default = Chapter;
