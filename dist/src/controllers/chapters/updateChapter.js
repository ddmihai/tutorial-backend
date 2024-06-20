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
exports.updateChapter = void 0;
const TutorialChapter_model_1 = __importDefault(require("../../models/TutorialChapter.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const updateChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, chapterId, description } = req.body;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(chapterId)) {
            return res.status(400).json({ message: "Invalid chapter ID" });
        }
        const chapter = yield TutorialChapter_model_1.default.findById(chapterId);
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }
        // Check if the fields are provided and are valid before updating
        if (title && title.trim().length >= 4) {
            chapter.title = title;
        }
        if (content && content.trim().length >= 4) {
            chapter.content = content;
        }
        if (description && description.trim().length >= 4) {
            chapter.description = description;
        }
        yield chapter.save();
        return res.status(200).json({ message: "Chapter updated successfully", chapter });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.updateChapter = updateChapter;
