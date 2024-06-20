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
exports.createTutorial = void 0;
const Tutorials_model_1 = __importDefault(require("../../models/Tutorials.model"));
const createTutorial = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   Get the user Id fot the author field from the session
        const userId = req.session.user._id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const { title, subtitle, description } = req.body;
        // Check for null values
        if (!title || !subtitle || !description) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // Check for empty values and less than three chatacters when trimmed
        if (title.trim().length < 3 || subtitle.trim().length < 3 || description.trim().length < 3)
            return res.status(400).json({ message: "Fields must be at least three characters" });
        const newTutorial = new Tutorials_model_1.default({
            title,
            subtitle,
            description,
            author: userId
        });
        const tutorial = yield newTutorial.save();
        // If the tutorial had ben created, send response
        return res.status(201).json({ message: "Tutorial created successfully", tutorial });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createTutorial = createTutorial;
