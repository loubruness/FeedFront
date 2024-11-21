import { db } from '../db_connection';

export type Field = {
  id: number;
  id_form: number;
  name: string;
  question: string;
};

export type Form = {
  id: number;
  course_name: string;
  level: string;
  end_date: Date;
  fields: Array<Field>;
};

export type FieldResponse = {
  id: number;
  id_form: number;
  name: string;
  question: string;
  note: number;
};

export type FormResponse = {
  id: number;
  course_name: string;
  level: string;
  form_id: number;
  fields: Array<FieldResponse>;
};


export const getForms = async (): Promise<Form[]> => {
  return await db('forms').select('*');
};

export const getFormById = async(id
: number): Promise<Form> => {
  return (await db('forms').select('*').where('id', id))[0];
}

export const getFormResponses = async(id : number): Promise<FormResponse[]> => {
  return await db('forms_responses').select('*').where('form_id', id);
}

export const getFormResponseById = async(id : number): Promise<FormResponse> => {
  return (await db('forms_responses').select('*').where('id', id))[0];
}

export const getFormFields = async(id : number): Promise<Field[]> => {
  return await db('fields').select('*').where('id_form', id);
}

export const getFormFieldsResponses = async(id : number): Promise<FieldResponse[]> => {
  return await db('fields_responses').select('*').where('form_id', id);
}