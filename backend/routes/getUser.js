import { Router } from 'express';
import { getUserInfo } from '../controllers/index.js';
import { authenticateMiddleware } from '../auth/index.js';

const profileRouter = Router();

profileRouter.get("/profile", authenticateMiddleware, getUserInfo);

export { profileRouter };