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
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uri = process.env.MONGODB_URI;
        yield mongoose_1.default.connect(uri);
        if (mongoose_1.default.ConnectionStates.connected) {
            console.log('Connected to MongoDB');
        }
        if (mongoose_1.default.ConnectionStates.disconnected) {
            console.log('Disconnected from MongoDB');
        }
        else if (mongoose_1.default.ConnectionStates.disconnected) {
            console.log('Disconnected from MongoDB');
        }
    }
    catch (error) {
        console.error('Failed to connect to MongoDB:', error instanceof Error && error.message);
        process.exit(1);
    }
});
exports.default = connectDB;
