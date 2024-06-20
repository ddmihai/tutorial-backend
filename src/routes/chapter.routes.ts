import { Router } from "express";
import { createTutorialChapter } from "../controllers/chapters/createTutorialChapter";
import { requireAuth } from "../middleware/requireAuth";
import { getChaptersFromTutorialId } from "../controllers/chapters/getChapterByTutorialId";
import { getIndividualChapter } from "../controllers/chapters/getIndividualChapter";
import { updateChapter } from "../controllers/chapters/updateChapter";
import { deleteChapter } from "../controllers/chapters/deleteChapter";


const chapterRouter = Router();


chapterRouter.post('/create', requireAuth, createTutorialChapter);
chapterRouter.get('/get-chapters-by-tutorialId/:tutorialId', requireAuth, getChaptersFromTutorialId);
chapterRouter.get('/get-individual-chapter/:chapterId', requireAuth, getIndividualChapter);
chapterRouter.put('/update', requireAuth, updateChapter);
chapterRouter.put('/delete/:chapterId', requireAuth, deleteChapter);





export default chapterRouter;