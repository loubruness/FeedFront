import { Class, Course } from '../util/Student';
import { Request, Response } from 'express';

import  Email from '../models/email2';
import hbs from 'nodemailer-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';
import { sign } from 'jsonwebtoken';

const EFREI_API_URL = process.env.EFREI_API_URL || "http://localhost:8000";
const EFREI_API_KEY = process.env.EFREI_API_KEY || "";


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

async function sendFormEmailStudent(student_id : number, student_email : string, course : string, endDate : string) : Promise<string> {

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

    const token = createTokenForm(student_id, "student", endDate);
    
    const link = "http://localhost:3000/forms/form1?token=" + token;
    const date = new Date(endDate).toLocaleDateString();

    const templateData = {
        course,
        link,
        date
    }

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
            to: student_email,
            subject: "Evaluation Form for " + course + " available",
            template: "welcome",
            context: templateData,
            attachments: [
                {
                    filename: 'Logo.png', // Name of the image file
                    path: path.join(__dirname, '../config/assets/Logo.png'), // Path to the image
                    cid: 'image_cid' // The content ID to reference in the email
                }
            ]
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Message sent: ${info.messageId}`);
        return 'Message sent';
    } catch (error) {
        console.error('Error sending email:', error);
        return error;
    }
}


async function fetchStudentsByCourse(id_course) : Promise<Class> {
    const response = await fetch(`${EFREI_API_URL}/student/getStudentsByCourse/${ id_course }`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json", 
            "x-api-key": EFREI_API_KEY 
        },
    });

    if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
    }

    return response.json();
}

async function fetchInfoCourse(id_course) : Promise<Course> {
    const response = await fetch(`${EFREI_API_URL}/course/getInfoCourse?id_course=${ id_course }`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json", 
            "x-api-key": EFREI_API_KEY 
        },
    });

    if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
    }

    return response.json();
}   

async function sendFormToStudentsByCourse(req : Request, res : Response) : Promise<void> {
    const id_course = req.body.id_course;
    if(!id_course) {
        res.status(400).json({ error: "Course ID is required" });
        return
    }else {
        const listStudents = await fetchStudentsByCourse(req.body.id_course);
        if(listStudents.students.length === 0) {
            res.status(400).json({ error: "No students found for this course" });
            return
        }
        const course : Course = await fetchInfoCourse(req.body.id_course);
        var emailsSent = true;
        listStudents.students.forEach(async student => {
            const result = await sendFormEmailStudent(student.id, student.email, course.name, "2024-12-31T23:59:59Z");
            console.log(result);
            if(result !== 'Message sent') {
                emailsSent = false;
                res.status(500).json({ message: "An error occured while sending the emails!" });
            }
        });
        if(emailsSent) {
            res.status(200).json({ message: "Emails were sent successfully" });
        }else{
            res.status(500).json({ message: "An error occured while sending the emails!" });
        }
    }
}

async function sendFormToStudentsByCourseFunction(course_name : string, endDate : Date) : Promise<string> {
    console.log("course name :", course_name);
    const response = await fetch(`${EFREI_API_URL}/course/getCourseId?name=${course_name}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json", 
            "x-api-key": EFREI_API_KEY 
        },
    });
    
    const data = await response.json();
    console.log("data", data);
    const id_course = data.id_course;
    console.log("id_course", id_course);
    if(!id_course) {
        return("Course ID is required" );
    }else {
        const listStudents = await fetchStudentsByCourse(id_course);
        if(listStudents.students.length === 0) {
            return("No students found for this course");
        }
        console.log("listStudents", listStudents);
        const course : Course = await fetchInfoCourse(id_course);
        console.log("course", course);
        var emailsSent = true;
        listStudents.students.forEach(async student => {
            const result = await sendFormEmailStudent(student.id, student.email, course_name, endDate.toISOString());
            console.log(result);
            if(result !== 'Message sent') {
                emailsSent = false;
                return("An error occured while sending the emails!");
            }
        });
        if(emailsSent) {
            return("Emails were sent successfully" );
        }else{
            return("An error occured while sending the emails!");
        }
    }
}


export {
    send,
    sendFormEmail,
    sendFormToStudentsByCourse,
    sendFormToStudentsByCourseFunction
};