import { db } from '../db_connection';

export type Field = {
  id_field: number;
  title: string;
  question: string;
};

export type Form = {
  id_form: number;
  id_admin: number;
  course_name: string;
  end_date: Date;
  status: string;
};

export type FormWithFields = {
  id_form: number;
  course_name: string;
  end_date: Date;
  status: string;
  fields: Array<Field>;
};


export const getForms = async (): Promise<Form[]> => {
  try {
    return await db('forms').select('*');
  }
  catch (error) {
    throw error;
  }
};

export const getFormById = async (id_form: number): Promise<Form> => {
  try {
    return (await db('forms').select('*').where('id_form', id_form))[0];
  }
  catch (error) {
    throw error;
  }

};

export const updateForm = async (form: Form): Promise<Form> => {
  try {
    await db('forms').update(form).where('id_form', form.id_form);
    return form;
  }
  catch (error) {
    throw error;
  }
}

const getFormFields = async (id_form: number): Promise<Field[]> => {
  try {
    return await db('fields').select('*').where('id_form', id_form);
  }
  catch (error) {
    throw error;
  }
}


export const getFormWithFields = async (id_form: number): Promise<FormWithFields> => {
  try {
    const form = await getFormById(id_form);
    return {
      ...form,
      fields: await getFormFields(id_form),
    };
  }
  catch (error) {
    throw error;
  }
};

export const createFormWithFields = async (form: FormWithFields): Promise<FormWithFields> => {
  try {
    const { fields, id_form: undefined, ...formData } = form;
    const [{ id_form }] = await db('forms').insert(formData).returning('id_form');
    const fieldsWithoutId = fields.map(({ id_field, ...rest }) => ({ ...rest, id_form }));
    console.log('createFormWithFields', { fields: fieldsWithoutId, id_form, ...formData });
    await db('fields').insert(fieldsWithoutId);
    return { ...form, id_form };
  }
  catch (error) {
    throw error;
  }
};

export const updateFormWithFields = async (form: FormWithFields): Promise<FormWithFields> => {
  try {
    const { fields, ...formData } = form;
    await db('forms').update(formData).where('id_form', form.id_form);
    const fieldsWithId = fields.map((field) => ({ ...field, id_form: form.id_form }));
    await db('fields').where('id_form', form.id_form).del();
    await db('fields').insert(fieldsWithId);
    return form;
  }
  catch (error) {
    throw error;
  }
}

export const deleteForm = async (id_form: number): Promise<void> => {
  try {
    await db('fields').where('id_form', id_form).del();
    await db('forms').where('id_form', id_form).del();
  }
  catch (error) {
    throw error;
  }
};
