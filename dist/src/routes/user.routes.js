"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUser_1 = require("../controllers/users/createUser");
const userLogin_1 = require("../controllers/users/userLogin");
const getUserData_1 = require("../controllers/users/getUserData");
const requireAuth_1 = require("../middleware/requireAuth");
const multerImages_1 = require("../middleware/multerImages");
const addAvatar_1 = require("../controllers/users/addAvatar");
const logoutUser_1 = require("../controllers/users/logoutUser");
const userRouter = (0, express_1.Router)();
// User routes
userRouter.post('/create', createUser_1.createuser);
userRouter.post('/login', userLogin_1.userLogin);
userRouter.get('/get-data', requireAuth_1.requireAuth, getUserData_1.getUserData);
userRouter.post('/add-avatar', requireAuth_1.requireAuth, multerImages_1.upload.single('image'), addAvatar_1.addAvatar);
userRouter.post('/logout', logoutUser_1.logout);
exports.default = userRouter;
