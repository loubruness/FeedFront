import {createFormWithFields, deleteForm, getFormById, getFormWithFields, getForms, updateForm, updateFormWithFields} from '../database/queries/forms';

import nodeShedul from 'node-schedule';
import { sendFormToStudentsByCourseFunction } from './email';

const courses = [
    {
        name: "Advanced Programming",
        end_date: () =>
        {
            const date = new Date();
            date.setSeconds(date.getSeconds() + 10);
            return date;
        }
    },
    {
        name: "Mathematics",
        end_date: () => 
        {
            const date = new Date();
            date.setSeconds(date.getSeconds() + 20);
            return date;
        }
    },
    {
        name: "Physics",
        end_date: () => {
            const date = new Date();
            date.setSeconds(date.getSeconds() + 30);
            return date;
        }
    },
    {
        name: "Chemistry",
        end_date: () => {
            const date = new Date();
            date.setMonth(date.getMonth() + 1);
            return date;
        }
    },
    {
        name: "Biology",
        end_date: () => {
            const date = new Date();
            date.setMonth(date.getMonth() + 1);
            return date;
        }
    }
];

const response_delay = 1; // in months

export async function getFormsAction(request, response) {
    try {
        response.status(200).json(await getForms());
    }
    catch (error) {
        response.status(500).json({ error: error });
        console.log(error);
    }
}

export async function getFormWithFieldsAction(request, response) {
    try {
        if (!request.params.id_form) {
            response.status(500).json({ error: 'id_form is required' });
            return;
        }
        const id_form = parseInt(request.params.id_form);
        const res = await getFormById(id_form);
        if (!res) {
            response.status(500).json({ error: `Form ${id_form} not found` });
            return;
        }
        response.status(200).json(await getFormWithFields(id_form));
    }
    catch (error) {
        response.status(500).json({ error: error});
        console.log(error);
    }
}

export async function createFormWithFieldsAction(request, response) {
    try {

        const end_date = courses.find(course => course.name === request.body.course_name).end_date();
        console.log(end_date);
        const id_admin = request.body?.user_id || 11;
        response.status(200).json(await createFormWithFields({ ...request.body, end_date, id_admin }));
    }
    catch (error) {
        response.status(500).json({ error: error });
        console.log(error);
    }
}

export async function updateFormWithFieldsAction(request, response) {  
    try {
        if (!request.params.id_form) {
            response.status(500).json({ error: 'id_form is required' });
            return;
        }

        const end_date = courses.find(course => course.name === request.body.course_name).end_date();
        console.log(request.body);
        const id_admin = request.body?.user_id || 11;
        const db_form = await getFormById(request.params.id_form);

        if (db_form) {
            if (db_form.status === 'draft') {
                console.log(`updating form ${request.params.id_form}`);
                response.status(200).json(await updateFormWithFields({ ...request.body, end_date, id_admin }));
            }
            else {
                response.status(500).json({ error: `Form ${request.body.id_form} is not in draft, it as already been finalized` });
            }
        }
        else {
            const errorMessage = `Form ${request.body.id_form} not found`
            console.log(errorMessage);
            response.status(500).json({ error: errorMessage });
        }
    }
    catch (error) {
        response.status(500).json({ error: error });
        console.log(error);  
    }
}

export async function finalizeFormAction(request, response) {
    try {
        if (!request.params.id_form) {
            response.status(500).json({ error: 'id_form is required' });
            return;
        }

        const id_form = parseInt(request.params.id_form);
        const form = await getFormById(id_form);
        if (form && form.status) {
            if (form.status === 'draft') {
                await updateForm({ ...form, status: 'finalized' });
                const end_date = form.end_date;
                const job = nodeShedul.scheduleJob(end_date, async function () {
                    await sendFormAction(id_form);
                });
                console.log(`Form ${id_form} finalized and scheduled to be sent the ${end_date}`);
                response.status(200).json({ message: `Form ${id_form} finalized and scheduled to be sent the ${end_date}` });
            }
            else {
                response.status(500).json({ error: `Form ${id_form} is not in draft` });
            }
        }
        else {
            response.status(500).json({ error: `Form ${id_form} not found` });
        }
    }
    catch (error) {
        response.status(500).json({ error: error });
        console.log(error);
    }
}

async function sendFormAction(id_form: number) {
    try {
        if (!id_form) {
            console.log('sendFormAction: id_form is required');
            return { error: 'id_form is required' };
        }
        const form = await getFormById(id_form);
        if (form) {
            const end_date = new Date()
            end_date.setMonth(new Date(form.end_date).getMonth() + response_delay);
            console.log('send date: ',end_date);
            updateForm({ ...form, end_date, status: 'current' });
            // Paupau tu peux send ici

            const result = await sendFormToStudentsByCourseFunction(form.course_name, end_date);
            
            if(result !== 'Emails were sent successfully') {
                console.log(`sendFormAction: An error occured while sending the emails!`);
                return { error: `An error occured while sending the emails!` };
            }
            
            console.log(`Form ${id_form} sent`);
            const job = nodeShedul.scheduleJob(form.end_date, async function () {
                await closeFormAction(id_form);
            });
            console.log(`Form ${id_form} closed the ${form.end_date}`);

        }
        else {
            console.log(`sendFormAction: Form ${id_form} not found`);
            return { error: `Form ${id_form} not found` };
        }
    }
    catch (error) {
        console.log('sendFormAction: ',error);
        return { error: error };
    }
}

async function closeFormAction(id_form: number) {
    try {
        if (!id_form) {
            console.log('closeFormAction: id_form is required');
            return { error: 'id_form is required' };
        }
        const form = await getFormById(id_form);
        if (form) {
            updateForm({ ...form, status: 'past' });
            console.log(`Form ${id_form} closed`);
        }
        else {
            console.log(`closeFormAction: Form ${id_form} not found`);
            return { error: `Form ${id_form} not found` };
        }
    }
    catch (error) {
        console.log('closeFormAction: ',error);
        return { error: error };
    }
}

export async function deleteFormAction(request, response) {
    try {
        const id_form = parseInt(request.params.id_form);
        await deleteForm(id_form);
        response.status(200).json({ message: `Form ${id_form} deleted` });
    }
    catch (error) {
        response.status(500).json({ error: error });
        console.log(error);
    }
}

export async function getCourseWithoutFormAction(request, response) {
    try {
        const coursesOptions = courses.map(course => course.name);
        const courseUsed = (await getForms()).map(form => form.course_name);
        const coursesWithoutForm = coursesOptions.filter(course => !courseUsed.includes(course));
        response.status(200).json(coursesWithoutForm);
        console.log(coursesWithoutForm);
    }
    catch (error) {
        response.status(500).json({ error: error });
        console.log(error);
    }
}




