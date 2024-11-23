import express, { NextFunction, Request, Response } from 'express';

import authRoutes from './routes/auth';
import cors from 'cors';
import dotenv from 'dotenv';
import emailRoutes from './routes/email';
import hbs from 'nodemailer-handlebars';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import otherRoutes from './routes/verifyToken';
import path from 'path';
import {verifyToken} from './middlewares/security';

const { sign } = jwt;

dotenv.config();

const app = express();
const PORT: number = 3001;

app.use(express.json());

app.use(cors({
    origin: '*', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));

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
app.use('/email', emailRoutes);

app.post('/deliver', async (req: Request, res: Response) => {
    let {recipient, subject, text, html, } = req.body;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: process.env.EMAIL, 
        to: recipient,
        subject: subject, 
        text: text,
        html: html
    });

    console.log("Message sent: %s", info.messageId);

    res.status(200).send("Message sent")
})



function createTokenForm(user_id: number, user_type: string, endDate: string) : string {
    const secretKeyForm = process.env.SECRET_KEY_FORM;

    if (!secretKeyForm) {
        throw new Error("SECRET_KEY is not defined in the environment variables");
    }
    const expirationTime = Math.floor(new Date(endDate).getTime() / 1000);
    
    return sign({user_id: user_id, user_type: user_type}, secretKeyForm, { expiresIn: expirationTime });
}


app.post('/deliver2', async (req: Request, res: Response) => {
    const { recipient, subject, templateName, templateData } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const token = createTokenForm(templateData.user_id, templateData.user_type, templateData.endDate);
    
    templateData.link = "http://localhost:3000/forms/form1?token=" + token;
    templateData.date = new Date(templateData.endDate).toLocaleDateString();

    // Configure handlebars
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./config/templates/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./config/templates/'),
        extName: '.hbs',
    };

    transporter.use('compile', hbs(handlebarOptions));

    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: recipient,
            subject: subject,
            template: templateName,
            context: templateData,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Message sent: ${info.messageId}`);
        res.status(200).send('Message sent');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
});
