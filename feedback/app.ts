import express, { NextFunction, Request, Response } from 'express';

import authRoutes from './routes/auth';
import dotenv from 'dotenv';

dotenv.config();
import { json } from 'body-parser';
import forms from './routes/forms';
import responses from './routes/responses';
import cors from 'cors';

const app = express();
const PORT: number = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World');
});
app.use(cors());
app.use('/forms', forms);
app.use('/responses', responses);

app.listen(PORT, (error?: Error) => {
    if (!error) {
        console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
    } else {
        console.error("Error occurred, server can't start", error);
    }
});

app.use('/auth', authRoutes);