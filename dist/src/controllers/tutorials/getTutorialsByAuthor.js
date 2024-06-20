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
exports.getTutorialsByUserID = void 0;
const Tutorials_model_1 = __importDefault(require("../../models/Tutorials.model"));
const getTutorialsByUserID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if session and user object exist
        const session = req.session;
        if (!session || !session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Retrieve user ID from session
        const userId = session.user._id;
        // Fetch tutorials by user ID
        const tutorials = yield Tutorials_model_1.default.find({ author: userId }).exec();
        // Return tutorials in response
        return res.status(200).json({ tutorials });
    }
    catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getTutorialsByUserID = getTutorialsByUserID;
