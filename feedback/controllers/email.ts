import { Class, Course } from '../util/Student';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { storeTokenForm, verifyTokenUsed, getStudentFormToken } from '../database/queries/email';

import hbs from 'nodemailer-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

const EFREI_API_URL = process.env.EFREI_API_URL || "http://localhost:8000";
const EFREI_API_KEY = process.env.EFREI_API_KEY || "";

/**
 * Creates the token used for the evaluation form.
 * @param user_id - The identifier of the student.
 * @param user_type - The type of the user (student).
 * @param endDate - The end date for the evaluation form.
 * @returns The token, throws an error if token could not be created
 */
function createTokenForm(user_id: number, user_type: string, endDate: string) : string {
    const secretKeyForm = process.env.SECRET_KEY_FORM;

    if (!secretKeyForm) {
        throw new Error("SECRET_KEY is not defined in the environment variables");
    }
    const expirationTime = Math.floor(new Date(endDate).getTime() / 1000);
    
    return sign({user_id: user_id, user_type: user_type}, secretKeyForm, { expiresIn: expirationTime });
}

/**
 * Verifies the token used for the evaluation form.
 * @param token - The token to verify.
 * @returns The decoded token if valid, otherwise throws an error.
 */
const verifyTokenForm = (token : string) => {
    const secretKeyForm = process.env.SECRET_KEY_FORM;

    if (!secretKeyForm) {
        throw new Error("SECRET_KEY is not defined in the environment variables");
    }

    try {
        return verify(token, secretKeyForm);
    } catch (error) {
        throw new Error("Invalid token");
    }
}

/**
 * Verifies the token provided in the request query was not already used.
 * @param token - The token to verify.
 * @returns A boolean indicating whether the token was already used.
 */
const verifyTokenAlreadyUsed = async (token : string) => {
    const alreadyUsedToken = await verifyTokenUsed(token);
    if(alreadyUsedToken != null) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Verifies the token provided in the request query is valid and was not already used.
 * @param req - The request object.
 * @param res - The response object.
 */
const verifyToken = async (req : Request, res : Response) => {
    const token = req.query.token;
    if (!token || typeof token !== 'string') {
        res.status(400).json({ error: "Token is required" });
        return;
    }
    const verified = verifyTokenForm(token);
    const alreadyUsed = await verifyTokenAlreadyUsed(token);
    if(verified != null && !alreadyUsed) {
        res.status(200).json({ message: "Token is valid" });
    }
    else{
        res.status(400).json({ error: "Invalid token" });
    }
}

/**
 * Sends an evaluation form email to a student.
 * @param student_id - The ID of the student.
 * @param student_email - The email address of the student.
 * @param course - The name of the course.
 * @param endDate - The end date for the evaluation form.
 * @returns A promise that resolves to a message indicating the result of the email sending process.
 */
async function sendFormEmailStudent(student_id : number, student_email : string, course : string, endDate : string, id_form : number) : Promise<string> {

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

    storeTokenForm(student_id, id_form, token);
    
    const link = "http://localhost:3000/pages/FeedbackSystemIntro?idForm=" + id_form +"&token=" + token;
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

/**
 * Fetches students by course ID.
 * @param id_course - The ID of the course.
 * @returns A promise that resolves to a Class object containing the list of students.
 */
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

/**
 * Fetchs the information of a specific course.
 * @param id_course - The identifier of the course.
 * @returns A promise that resolves to all the information needed of a course.
 */
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

/**
 * Sends evaluation forms to students of a specific course.
 * @param course_name - The name of the course.
 * @param endDate - The end date for the evaluation form.
 * @returns A promise that resolves to a message indicating the result of the email sending process.
 */
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
            const result = await sendFormEmailStudent(student.id, student.email, course.name, "2024-12-31T23:59:59Z", 1);
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


/**
 * Sends evaluation forms to students of a specific course.
 * @param course_name - The name of the course.
 * @param endDate - The end date for the evaluation form.
 * @returns A promise that resolves to a message indicating the result of the email sending process.
 */
async function sendFormToStudentsByCourseFunction(course_name : string, endDate : Date, id_form : number) : Promise<string> {
    const response = await fetch(`${EFREI_API_URL}/course/getCourseId?name=${course_name}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json", 
            "x-api-key": EFREI_API_KEY 
        },
    });
    
    const data = await response.json();
    const id_course = data.id_course;
    if(!id_course) {
        return("Course ID is required" );
    }else {
        const listStudents = await fetchStudentsByCourse(id_course);
        if(listStudents.students.length === 0) {
            return("No students found for this course");
        }
        const course : Course = await fetchInfoCourse(id_course);
        var emailsSent = true;
        listStudents.students.forEach(async student => {
            const result = await sendFormEmailStudent(student.id, student.email, course_name, endDate.toISOString(), id_form);
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

/**
 * Send the evaluation token to the student.
 * @param req - The request object.
 * @param rep - The response object.
 * @returns 
 */
const getStudentFormTokenFunction = async (req: Request, rep: Response): Promise<void> => {
    try {
        if (req.body.user_role !== "student") {
            rep.status(403).json({ error: "You are not a student" });
            return;
        }
        if (!req.body.user_id) {
            rep.status(400).json({ error: "Student ID is required" });
            return;
        }
        const id_form = parseInt(req.params.id_form);
        if (!id_form) {
            rep.status(400).json({ error: "Form ID is required" });
            return;
        }
        const token = await getStudentFormToken(req.body.user_id, id_form);
        if (token) {
            rep.status(200).json( token );
        } else {
            rep.status(404).json({ error: "Token not found" });
        }
    } catch (error) {
        rep.status(500).json({ error: error });
    }
}

    


export {
    sendFormToStudentsByCourse,
    sendFormToStudentsByCourseFunction,
    verifyToken,
    getStudentFormTokenFunction,
};