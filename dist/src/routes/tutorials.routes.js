"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createTutorial_1 = require("../controllers/tutorials/createTutorial");
const requireAuth_1 = require("../middleware/requireAuth");
const getTutorialsByAuthor_1 = require("../controllers/tutorials/getTutorialsByAuthor");
const deleteTutorial_1 = require("../controllers/tutorials/deleteTutorial");
const getTutorialWhole_1 = require("../controllers/tutorials/getTutorialWhole");
const tutorialRouter = (0, express_1.Router)();
tutorialRouter.post('/create', requireAuth_1.requireAuth, createTutorial_1.createTutorial);
tutorialRouter.get('/tutorials-by-author', requireAuth_1.requireAuth, getTutorialsByAuthor_1.getTutorialsByUserID);
tutorialRouter.delete('/delete/:tutorialId', requireAuth_1.requireAuth, deleteTutorial_1.deleteTutorial);
// get individual tutorial as a whole with containing chapters
tutorialRouter.get('/get-tutorial/:tutorialId', getTutorialWhole_1.getTutorialWhole);
exports.default = tutorialRouter;
