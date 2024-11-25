import e from 'express';
import {getForms, getFormById, getFormWithFields, createFormWithFields, updateFormWithFields, deleteForm } from '../database/queries/forms';

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
        const id_form = parseInt(request.params.id_form);
        response.status(200).json(await getFormWithFields(id_form));
    }
    catch (error) {
        response.status(500).json({ error: error});
        console.log(error);
    }
}

export async function createFormWithFieldsAction(request, response) {
    try {
        const end_date = new Date();
        end_date.setMonth(end_date.getMonth() + 6);
        const id_admin = 11;
        response.status(200).json(await createFormWithFields({ ...request.body, end_date, id_admin }));
    }
    catch (error) {
        response.status(500).json({ error: error });
        console.log(error);
    }
}

export async function updateFormWithFieldsAction(request, response) {  
    try {
        const end_date = new Date();
        end_date.setMonth(end_date.getMonth() + 6);
        console.log(request.body);
        const id_admin = 11;

        if (await getFormById(request.body.id_form)) {
            console.log(`updating form ${request.body.id_form}`);
            response.status(200).json(await updateFormWithFields({ ...request.body, end_date, id_admin }));
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
        const coursesOptions = ["Default", "Advanced Programming", "Mathematics", "Software Architecture and Design", "English"];
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




