import e from 'express';
import {getForms, getFormWithFields, createFormWithFields, updateFormWithFields } from '../database/queries/forms';

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

export async function saveFormWithFieldsAction(request, response) {  
    try {
        const end_date = new Date();
        end_date.setMonth(end_date.getMonth() + 6);
        const id_admin = 11;
        if (await getFormWithFields(request.body.id_form)) {
            response.status(200).json(await updateFormWithFields({ ...request.body, end_date, id_admin }));
        }
        else {
            response.status(201).json(await createFormWithFields({ ...request.body, end_date, id_admin }));
        }
    }
    catch (error) {
        response.status(500).json({ error: error });
        console.log(error);  
    }
}





