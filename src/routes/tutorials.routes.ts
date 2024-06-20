import { Router } from "express";
import { createTutorial } from "../controllers/tutorials/createTutorial";
import { requireAuth } from "../middleware/requireAuth";
import { getTutorialsByUserID } from "../controllers/tutorials/getTutorialsByAuthor";
import { deleteTutorial } from "../controllers/tutorials/deleteTutorial";
import { getTutorialWhole } from "../controllers/tutorials/getTutorialWhole";


const tutorialRouter = Router();




tutorialRouter.post('/create', requireAuth, createTutorial);
tutorialRouter.get('/tutorials-by-author', requireAuth, getTutorialsByUserID);
tutorialRouter.delete('/delete/:tutorialId', requireAuth, deleteTutorial);


// get individual tutorial as a whole with containing chapters
tutorialRouter.get('/get-tutorial/:tutorialId', getTutorialWhole);



export default tutorialRouter;