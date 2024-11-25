import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { config } from 'dotenv';

import { logger } from './utils/index.js';
import { authRouter, setupRouter } from './routes/index.js';
import { db } from './database/index.js';
import "./strategies/passport-google.js"

config(); 

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors()); 

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'default-secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 1000 * 60 * 60 }, 
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/setup', setupRouter);
app.use('/api/v1/auth', authRouter);

app.use((err, req, res, next) => {
    logger.error('Error:', err);
    if (err) {
        return res.status(err.statusCode || 400).json({
            success: false,
            message: err.message,
        });
    }
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
});

process.on('SIGINT', async () => {
    try {
        logger.info('Closing database connection...');
        await db.destroy();
        logger.info('Database connection closed.');
        process.exit(0);
    } catch (error) {
        logger.error('Error closing database connection:', error.message);
        process.exit(1);
    }
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', { reason, promise });
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error.message);
    process.exit(1);
});

export default app;
