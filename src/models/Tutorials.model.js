"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TutorialSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});
const Tutorial = mongoose_1.default.model('Tutorial', TutorialSchema);
exports.default = Tutorial;
