"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory where files will be stored
        cb(null, 'src/uploads/images');
    },
    filename: function (req, file, cb) {
        // Get user Id and specify it for the unique avatar name
        const user = req.session.user;
        // Specify a unique filename for uploaded files
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-user-' + user._id;
        const extension = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});
const fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Only images are allowed'), false);
    }
};
const upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
exports.upload = upload;
