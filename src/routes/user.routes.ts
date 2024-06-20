import { Router } from "express";
import { createuser } from "../controllers/users/createUser";
import { userLogin } from "../controllers/users/userLogin";
import { getUserData } from "../controllers/users/getUserData";
import { requireAuth } from "../middleware/requireAuth";
import { upload } from "../middleware/multerImages";
import { addAvatar } from "../controllers/users/addAvatar";
import { logout } from "../controllers/users/logoutUser";




const userRouter = Router();


// User routes
userRouter.post('/create', createuser);
userRouter.post('/login', userLogin);
userRouter.get('/get-data', requireAuth, getUserData);
userRouter.post('/add-avatar', requireAuth, upload.single('image'), addAvatar);
userRouter.post('/logout', logout);


export default userRouter;