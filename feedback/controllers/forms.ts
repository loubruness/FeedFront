import {getForms, getFormWithFields, createFormWithFields} from '../database/queries/forms';

export async function getFormsAction(request, response) {
    response.status(200).json(await getForms());
}

export async function getFormWithFieldsAction(request, response) {
    const id_form = parseInt(request.params.id_form);
    response.status(200).json(await getFormWithFields(id_form));
}

export async function createFormWithFieldsAction(request, response) {
    response.status(201).json(await createFormWithFields(request.body));
}




