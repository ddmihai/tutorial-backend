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
exports.createTutorialChapter = void 0;
const TutorialChapter_model_1 = __importDefault(require("../../models/TutorialChapter.model"));
const createTutorialChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, content, tutorial } = req.body;
        // Check for null values and for empty values wehn trimmed
        if (!title || !description || !content || !tutorial)
            return res.status(400).json({ error: "Please fill all the fields" });
        if (title.trim() === "" || description.trim() === "" || content.trim() === "")
            return res.status(400).json({ error: "Please fill all the fields" });
        // Create a new tutorial chapter
        const newTutorialChapter = new TutorialChapter_model_1.default({
            title,
            description,
            content,
            tutorial
        });
        yield newTutorialChapter.save();
        return res.status(201).json({ message: "Tutorial chapter created successfully" });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message, name: error.name });
        }
        return res.status(500).json({ error: "Something went wrong in the create tutorial controller" });
    }
});
exports.createTutorialChapter = createTutorialChapter;
