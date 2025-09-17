import { Router } from 'express';
import { signup, login } from '../controllers/index.js';

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);

export { authRouter };