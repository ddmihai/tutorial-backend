"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const mongoose_1 = require("mongoose");
// Require authentication middleware. This middleware request a session to be present with the user object.
const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        if (req.session && req.session.user && (0, mongoose_1.isValidObjectId)(req.session.user._id)) {
            next();
        }
        else {
            return res.status(401).json({ message: 'Unauthorized: Invalid user ID' });
        }
    }
    else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.requireAuth = requireAuth;
