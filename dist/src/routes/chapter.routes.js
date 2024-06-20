"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createTutorialChapter_1 = require("../controllers/chapters/createTutorialChapter");
const requireAuth_1 = require("../middleware/requireAuth");
const getChapterByTutorialId_1 = require("../controllers/chapters/getChapterByTutorialId");
const getIndividualChapter_1 = require("../controllers/chapters/getIndividualChapter");
const updateChapter_1 = require("../controllers/chapters/updateChapter");
const deleteChapter_1 = require("../controllers/chapters/deleteChapter");
const chapterRouter = (0, express_1.Router)();
chapterRouter.post('/create', requireAuth_1.requireAuth, createTutorialChapter_1.createTutorialChapter);
chapterRouter.get('/get-chapters-by-tutorialId/:tutorialId', requireAuth_1.requireAuth, getChapterByTutorialId_1.getChaptersFromTutorialId);
chapterRouter.get('/get-individual-chapter/:chapterId', requireAuth_1.requireAuth, getIndividualChapter_1.getIndividualChapter);
chapterRouter.put('/update', requireAuth_1.requireAuth, updateChapter_1.updateChapter);
chapterRouter.put('/delete/:chapterId', requireAuth_1.requireAuth, deleteChapter_1.deleteChapter);
exports.default = chapterRouter;
