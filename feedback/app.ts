import express, { NextFunction, Request, Response } from 'express';

import authRoutes from './routes/auth';
import cors from 'cors';
import dotenv from 'dotenv';
import emailRoutes from './routes/email';
import forms from './routes/forms';
import hbs from 'nodemailer-handlebars';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import otherRoutes from './routes/verifyToken';
import path from 'path';
import profileRoutes from './routes/profile';
import responses from './routes/responses';
import report from './routes/report';
import {verifyToken} from './middlewares/security';

const { sign } = jwt;

dotenv.config();

const app = express();
const PORT: number = 3001;

app.use(express.json());

app.use(cors({
    origin: '*', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    allowedHeaders: ['Content-Type, Authorization'], // Allow specific headers
}));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World');
});
app.use('/responses', responses);
app.use('/report', report);

app.listen(PORT, (error?: Error) => {
    if (!error) {
        console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
    } else {
        console.error("Error occurred, server can't start", error);
    }
});

app.use('/auth', authRoutes);

// middleware for verifying token
app.use(verifyToken);

app.use('/other', otherRoutes);
app.use('/email', emailRoutes);
app.use('/forms', forms);
app.use('/profile', profileRoutes);


