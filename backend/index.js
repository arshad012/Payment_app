import express, { json } from 'express'
import { config } from 'dotenv'
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import { authRouter, paymentRouter, profileRouter , webhookRouter } from './routes/index.js'
import { errorHandler } from './utils/index.js';

config()
const db_uri = process.env.MONGODB_URI
const port = process.env.PORT || 3000;
if (!db_uri) {
  console.error("❌ MONGODB_URI is not defined in environment variables.");
  process.exit(1);
}
const paymentApp = express();

const _dirname = path.resolve();

paymentApp.use(json());
paymentApp.use(cors());

mongoose.connect(db_uri)
    .then(() => console.log('✅ Database connected'))
    .catch(err => console.log('Database connection failed:', err));

// all api's
paymentApp.use("/auth", authRouter);
paymentApp.use("/api", paymentRouter);
paymentApp.use("/user", profileRouter);
paymentApp.use("/webhook", webhookRouter);


paymentApp.use(express.static(path.join(_dirname, "/frontend/dist")));
paymentApp.get("/", (_, res) => {
    res.json({ message: 'Payment app is ready' });
})
paymentApp.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})

paymentApp.use(errorHandler);

paymentApp.listen(port, () => {
    console.log(`🚀 Payment app is running on port ${port}`);
});