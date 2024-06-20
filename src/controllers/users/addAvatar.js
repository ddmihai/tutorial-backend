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
exports.addAvatar = void 0;
const User_model_1 = __importDefault(require("../../models/User.model"));
const promises_1 = require("fs/promises"); // Import unlink directly from fs.promises
const path_1 = __importDefault(require("path"));
const addAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = req.file;
        const userId = req.session.user._id;
        // Get the user and check if the 
        const existingUser = yield User_model_1.default.findById(userId);
        if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.avatar) && existingUser.avatar.length > 0) {
            yield (0, promises_1.unlink)(path_1.default.join(__dirname, '..', '..', 'uploads', 'images', existingUser.avatar));
        }
        // Update user with the new User path
        const updatedUser = yield User_model_1.default.findByIdAndUpdate(userId, { avatar: image === null || image === void 0 ? void 0 : image.filename }, { new: true }).select('-password');
        // send response
        return res.status(200).json({
            message: 'Avatar added successfully',
            data: updatedUser
        });
    }
    catch (error) {
        console.error('Error adding avatar:', error);
        next(error);
    }
});
exports.addAvatar = addAvatar;
function checkIfImageExists(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const imagePath = path_1.default.join(__dirname, '..', '..', 'uploads', 'images', filename);
        try {
            yield (0, promises_1.stat)(imagePath);
            return true; // Image exists
        }
        catch (error) {
            return false; // Image does not exist
        }
    });
}
