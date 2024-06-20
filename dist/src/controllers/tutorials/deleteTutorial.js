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
exports.deleteTutorial = void 0;
const Tutorials_model_1 = __importDefault(require("../../models/Tutorials.model"));
const mongoose_1 = require("mongoose");
const TutorialChapter_model_1 = __importDefault(require("../../models/TutorialChapter.model"));
const deleteTutorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tutorialId } = req.params;
    try {
        if (!(0, mongoose_1.isValidObjectId)(tutorialId)) {
            return res.status(400).json({ message: 'Invalid tutorial ID' });
        }
        const tutorial = yield Tutorials_model_1.default.findByIdAndDelete(tutorialId);
        yield TutorialChapter_model_1.default.deleteMany({ tutorial: tutorialId });
        return res.status(200).json({ message: 'Tutorial deleted successfully', tutorial });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting tutorial', error });
    }
});
exports.deleteTutorial = deleteTutorial;
