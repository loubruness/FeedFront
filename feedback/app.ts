import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import forms from './routes/forms';
import responses from './routes/responses';
import cors from 'cors';

const app = express();
const PORT: number = 3000;

app.use(json());
app.use(express.urlencoded({ extended: true }));

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
