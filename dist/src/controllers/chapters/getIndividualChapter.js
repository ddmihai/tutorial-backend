"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndividualChapter = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TutorialChapter_model_1 = __importDefault(require("../../models/TutorialChapter.model"));
const getIndividualChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chapterId } = req.params;
        // Check if chapterId is a valid ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(chapterId)) {
            return res.status(400).json({ message: "Invalid chapter ID" });
        }
        // Find the chapter by ID
        const chapter = yield TutorialChapter_model_1.default.findById(chapterId);
        // If chapter not found, return 404
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }
        // Return the found chapter
        return res.status(200).json(chapter);
    }
    catch (error) {
        console.error("Error fetching chapter:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getIndividualChapter = getIndividualChapter;
