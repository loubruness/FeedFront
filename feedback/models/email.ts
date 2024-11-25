// import dotenv from 'dotenv';
// import exphbs from 'nodemailer-express-handlebars';
// import nodemailer from 'nodemailer';
// import path from 'path';

// dotenv.config({ path: path.join(__dirname, '/../.env') });

// interface EmailAttachment {
//     filename: string;
//     path: string;
// }

// interface EmailOptions {
//     to: string;
//     subject: string;
//     template: string;
//     context: any;
//     attachments: EmailAttachment[];
// }

// class Email {
//     from: string;
//     to: string;
//     subject: string;
//     template: string;
//     context: any;
//     attachments: EmailAttachment[];

//     constructor(email: EmailOptions) {
//         this.from = 'masterbookefrei@gmail.com';
//         this.to = email.to;
//         this.subject = email.subject;
//         this.template = email.template;
//         this.context = email.context;
//         this.attachments = email.attachments.map(attachment => ({
//             ...attachment,
//             path: path.resolve(__dirname, '../config/emails/assets/' + attachment.path)
//         }));
//     }

//     static transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         auth: {
//             type: 'OAuth2',
//             user: process.env.MAIL_USERNAME,
//             pass: process.env.MAIL_PASSWORD,
//             clientId: process.env.OAUTH_CLIENTID,
//             clientSecret: process.env.OAUTH_CLIENT_SECRET,
//             refreshToken: process.env.OAUTH_REFRESH_TOKEN
//         }
//     });

//     static initialize() {
//         this.transporter.use(
//             'compile',
//             exphbs({
//                 viewEngine: {
//                     extName: '.handlebars',
//                     partialsDir: path.resolve(__dirname, '../config/emails/templates'),
//                     defaultLayout: false,
//                 },
//                 viewPath: path.resolve(__dirname, '../config/emails/templates'),
//             })
//         );
//     }

//     static send(email: EmailOptions, result: (success: boolean) => void) {
//         const emailInstance = new Email(email);
//         console.log(emailInstance);
//         this.transporter.sendMail(emailInstance, (err, data) => {
//             if (err) {
//                 console.log("Error " + err);
//                 result(false);
//             } else {
//                 console.log("Email sent successfully.");
//                 result(true);
//             }
//         });
//     }
// }

// Email.initialize();

// export = Email;