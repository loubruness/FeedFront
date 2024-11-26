import { Request, Response } from 'express';

import  Email from '../models/email2';
import hbs from 'nodemailer-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';
import { sign } from 'jsonwebtoken';

async function send(req: Request, res: Response) : Promise<void>{
    console.log("in");
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const email = new Email({
        to: req.body.to,
        subject: req.body.subject,
        template: req.body.template,
        context: req.body.context,
        attachments: req.body.attachments
    });

    Email.send(email, (result) => {
        if (!result) {
            res.status(500).json({ message: "An error occured while sending the email!" });
        } else {
            res.status(200).json({ message: "Email was sent." });
        }
    });
}

function createTokenForm(user_id: number, user_type: string, endDate: string) : string {
    const secretKeyForm = process.env.SECRET_KEY_FORM;

    if (!secretKeyForm) {
        throw new Error("SECRET_KEY is not defined in the environment variables");
    }
    const expirationTime = Math.floor(new Date(endDate).getTime() / 1000);
    
    return sign({user_id: user_id, user_type: user_type}, secretKeyForm, { expiresIn: expirationTime });
}


async function sendFormEmail(req: Request, res: Response) : Promise<void> {
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
}

export {
    send,
    sendFormEmail
};