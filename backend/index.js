import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import { authRouter, paymentRouter, profileRouter, webhookRouter } from './routes/index.js';
import { errorHandler } from './utils/index.js';

config();

const db_uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

if (!db_uri) {
    console.error('❌ MONGODB_URI is not defined in environment variables.');
    process.exit(1);
}

const paymentApp = express();
const _dirname = path.resolve();

// Middleware
paymentApp.use(json());
paymentApp.use(cors());

// MongoDB Connection
mongoose.connect(db_uri)
    .then(() => {
        console.log('✅ MongoDB connected');

        paymentApp.listen(port, () => {
            console.log(`🚀 Payment app is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err);
        process.exit(1);
    });

mongoose.connection.on('connected', () => {
    console.log('📡 Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error('⚠️ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('🔌 Mongoose disconnected');
});



// API Routes
paymentApp.use('/auth', authRouter);
paymentApp.use('/api', paymentRouter);
paymentApp.use('/user', profileRouter);
paymentApp.use('/webhook', webhookRouter);

// Serve frontend static files
paymentApp.use(express.static(path.join(_dirname, 'frontend', 'dist')));

// Health check
paymentApp.get('/', (_, res) => {
    res.json({ message: 'Payment app is ready' });
});

// SPA fallback
paymentApp.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
});

// Global error handler
paymentApp.use(errorHandler);
