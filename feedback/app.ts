import express, { NextFunction, Request, Response } from 'express';

import authRoutes from './routes/auth';
import dotenv from 'dotenv';
import otherRoutes from './routes/verifyToken';
import {verifyToken} from './middlewares/security';

dotenv.config();

const app = express();
const PORT: number = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World');
});

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