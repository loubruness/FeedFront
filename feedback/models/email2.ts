import dotenv from 'dotenv';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '/../config/emails/.env') });

interface EmailParams {
    to: string;
    subject: string;
    template: string;
    context: Record<string, any>;
    attachments: { path: string }[];
}

class Email {
    from: string;
    to: string;
    subject: string;
    template: string;
    context: Record<string, any>;
    attachments: { path: string }[];

    static transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    constructor(email: EmailParams) {
        this.from = 'masterbookefrei@gmail.com';
        this.to = email.to;
        this.subject = email.subject;
        this.template = email.template;
        this.context = email.context;

        this.attachments = email.attachments.map((attachment) => ({
            ...attachment,
            path: path.resolve(__dirname, '../config/assets/', attachment.path),
        }));
    }

    static async compileTemplate(templateName: string, context: Record<string, any>): Promise<string> {
        const templatePath = path.resolve(__dirname, '../config/templates', `${templateName}.handlebars`);
        
        const templateContent = await fs.promises.readFile(templatePath, 'utf-8');
        
        // Allow Handlebars to resolve prototype properties
        const template = handlebars.compile(templateContent);

        return template(context, { allowProtoPropertiesByDefault: true });
    }

    static send(email: Email, result: (success: boolean) => void): void {
        this.compileTemplate(email.template, email.context)
            .then((htmlContent) => {
                const emailOptions = {
                    from: email.from,
                    to: email.to,
                    subject: email.subject,
                    html: htmlContent,
                    attachments: email.attachments,
                };

                this.transporter.sendMail(emailOptions, (err, data) => {
                    if (err) {
                        console.error('Error:', err);
                        result(false);
                    } else {
                        console.log('Email sent successfully.');
                        result(true);
                    }
                });
            })
            .catch((err) => {
                console.error('Template compilation failed:', err);
                result(false);
            });
    }
}

export = Email;
