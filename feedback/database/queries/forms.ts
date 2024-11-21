import { db } from '../db_connection';

export type Field = {
  id_field: number;
  name: string;
  question: string;
};

export type Form = {
  id_form: number;
  course_name: string;
  end_date: Date;
};

export type FormWithFields = {
  id_form: number;
  course_name: string;
  end_date: Date;
  fields: Array<Field>;
};


export const getForms = async (): Promise<Form[]> => {
  return await db('forms').select('*');
};

const getFormById = async (id_form: number): Promise<Form> => {
  return (await db('forms').select('*').where('id_form', id_form))[0];
};

const getFormFields = async(id_form : number): Promise<Field[]> => {
  return await db('fields').select('*').where('id_form', id_form);
}

export const getFormWithFields = async (id_form: number): Promise<FormWithFields> => {
  const form = await getFormById(id_form);
  return {
    ...form,
    fields: await getFormFields(id_form),
  };
};

export const createFormWithFields = async (form: FormWithFields): Promise<FormWithFields> => {
  const { fields, ...formData } = form;
  const [id_form] = await db('forms').insert(formData).returning('id');
  const fieldsWithId = fields.map((field) => ({ ...field, id_form: id_form }));
  await db('fields').insert(fieldsWithId);
  return { ...form, id_form };
};
