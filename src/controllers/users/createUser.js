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
exports.createuser = void 0;
const User_model_1 = __importDefault(require("../../models/User.model"));
const createuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUSer = yield User_model_1.default.findOne({ email });
        if (existingUSer)
            return res.status(400).json({ message: "User already exists" });
        if (!password || password.length < 8)
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        const createdUser = yield User_model_1.default.create({ name, email, password });
        if (createdUser)
            return res.status(201).json({ message: "User created successfully" });
        // Fallback in case user creation fails for an unexpected reason
        return res.status(500).json({ message: "Failed to create user" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createuser = createuser;
