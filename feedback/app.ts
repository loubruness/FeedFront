import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT: number = 3000;

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
