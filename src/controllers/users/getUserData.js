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
exports.getUserData = void 0;
const User_model_1 = __importDefault(require("../../models/User.model"));
const getUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Check if session and user ID exist
        if (!req.session || !((_a = req.session.user) === null || _a === void 0 ? void 0 : _a._id)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Retrieve user from the database, excluding the password field
        const user = yield User_model_1.default.findById(req.session.user._id).select('-password');
        // If user not found, return 404
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Return user data with status 200
        return res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        // Return 500 status code on server error
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getUserData = getUserData;
