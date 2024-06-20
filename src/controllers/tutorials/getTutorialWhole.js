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
exports.getTutorialWhole = void 0;
const Tutorials_model_1 = __importDefault(require("../../models/Tutorials.model"));
const TutorialChapter_model_1 = __importDefault(require("../../models/TutorialChapter.model"));
const mongoose_1 = require("mongoose");
const getTutorialWhole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tutorialId } = req.params;
        const tutorial = yield Tutorials_model_1.default.findById(tutorialId);
        if (!(0, mongoose_1.isValidObjectId)(tutorial)) {
            return res.status(404).json({ message: 'Tutorial not found' });
        }
        const chapterList = yield TutorialChapter_model_1.default.find({ tutorial: tutorialId });
        return res.status(200).json({
            tutorial,
            chapterLists: chapterList
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getTutorialWhole = getTutorialWhole;
