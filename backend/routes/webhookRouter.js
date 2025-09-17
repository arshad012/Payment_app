import { Router } from 'express';
import { webhookLog } from '../controllers/index.js';

const webhookRouter = Router();

webhookRouter.post("/", webhookLog);

export { webhookRouter };