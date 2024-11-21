import {getForms, getFormById, getFormResponses, getFormResponseById, getFormFields, getFormFieldsResponses} from '../database/queries/forms';

export async function getFormsAction(request, response) {
    response.status(200).json(await getForms());
}