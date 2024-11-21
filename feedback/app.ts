import authRoutes from './routes/auth';
import dotenv from 'dotenv';
import express from 'express';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use('/auth', authRoutes);

app.listen(PORT, (error: any) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);