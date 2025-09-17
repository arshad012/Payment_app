import { Router } from 'express';
import { createPayment, paymentStatus, all_transactions } from '../controllers/index.js';
import { authenticateMiddleware } from '../auth/index.js';

const paymentRouter = Router();

paymentRouter.post("/create-payment", authenticateMiddleware, createPayment);
paymentRouter.get("/payment-status", paymentStatus);
paymentRouter.get("/transactions", all_transactions);

export { paymentRouter };