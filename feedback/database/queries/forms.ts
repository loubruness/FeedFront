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

/**
 * Fetch all forms from the database.
 * @returns A list of all forms.
 * @throws Error if the database query fails.
 */
export const getForms = async (): Promise<Form[]> => {
  try {
    return await db('forms').select('*');
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw new Error("Could not fetch forms.");
  }
};

/**
 * Fetch all forms associated with a specific course.
 * @param courseName - The name of the course.
 * @returns A list of forms for the course.
 * @throws Error if the database query fails.
 */
export const getCoursesForms = async (courseNames: string[]): Promise<Form[]> => {
  try {
    return await db('forms').select('*').whereIn('course_name', courseNames).whereIn('status', ['current','past']);
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw new Error("Could not fetch forms.");
  }
}

/**
 * Fetch a specific form by its ID.
 * @param id_form - The ID of the form to fetch.
 * @returns The form with the given ID.
 * @throws Error if the database query fails.
 */
export const getFormById = async (id_form: number): Promise<Form> => {
  try {
    const form = await db('forms').select('*').where('id_form', id_form).first();
    return form;
  } catch (error) {
    console.error(`Error fetching form with ID ${id_form}:`, error);
    throw new Error(`Could not fetch form with ID ${id_form}.`);
  }
};

/**
 * Update a specific form in the database.
 * @param form - The form object containing updated data.
 * @returns The updated form object.
 * @throws Error if the update operation fails.
 */
export const updateForm = async (form: Form): Promise<Form> => {
  try {
    await db('forms').update(form).where('id_form', form.id_form);
    return form;
  } catch (error) {
    console.error(`Error updating form with ID ${form.id_form}:`, error);
    throw new Error(`Could not update form with ID ${form.id_form}.`);
  }
};

/**
 * Fetch all fields associated with a specific form.
 * @param id_form - The ID of the form.
 * @returns A list of fields for the form.
 * @throws Error if the database query fails.
 */
const getFormFields = async (id_form: number): Promise<Field[]> => {
  try {
    return await db('fields').select('*').where('id_form', id_form);
  } catch (error) {
    console.error(`Error fetching fields for form ID ${id_form}:`, error);
    throw new Error(`Could not fetch fields for form ID ${id_form}.`);
  }
};

/**
 * Fetch a form along with its associated fields.
 * @param id_form - The ID of the form.
 * @returns The form with its fields.
 * @throws Error if the database query fails.
 */
export const getFormWithFields = async (id_form: number): Promise<FormWithFields> => {
  try {
    const form = await getFormById(id_form);
    const fields = await getFormFields(id_form);
    return { ...form, fields };
  } catch (error) {
    console.error(`Error fetching form with fields for ID ${id_form}:`, error);
    throw new Error(`Could not fetch form with fields for ID ${id_form}.`);
  }
};

/**
 * Create a new form with its associated fields in the database.
 * @param form - The form object with fields to create.
 * @returns The created form with its fields.
 * @throws Error if the creation operation fails.
 */
export const createFormWithFields = async (form: FormWithFields): Promise<FormWithFields> => {
  try {
    const { fields, id_form : undefine, ...formData } = form;
    const [{ id_form }] = await db('forms').insert(formData).returning('id_form');
    const fieldsWithFormId = fields.map(({ id_field, ...field }) => ({ ...field, id_form: id_form }));
    await db('fields').insert(fieldsWithFormId);
    return { ...form, id_form: id_form };
  } catch (error) {
    console.error("Error creating form with fields:", error);
    throw new Error(error.message || "Could not create form with fields.");
  }
};

/**
 * Update an existing form and its associated fields.
 * @param form - The form object with updated data and fields.
 * @returns The updated form with its fields.
 * @throws Error if the update operation fails.
 */
export const updateFormWithFields = async (form: FormWithFields): Promise<FormWithFields> => {
  try {
    const { fields, ...formData } = form;
    await db('forms').update(formData).where('id_form', form.id_form);
    await db('fields').where('id_form', form.id_form).del();
    await db('fields').insert(fields.map(field => ({ ...field, id_form: form.id_form })));
    return form;
  } catch (error) {
    console.error(`Error updating form with fields for ID ${form.id_form}:`, error);
    throw new Error(`Could not update form with fields for ID ${form.id_form}.`);
  }
};

/**
 * Delete a specific form and its associated fields from the database.
 * @param id_form - The ID of the form to delete.
 * @throws Error if the deletion operation fails.
 */
export const deleteForm = async (id_form: number): Promise<void> => {
  try {
    await db.transaction(async (trx) => {
      // Supprimer les données dépendantes dans le bon ordre
      await trx('grades').where('id_form', id_form).del();
      await trx('students_forms').where('id_form', id_form).del();
      await trx('teachers_forms').where('id_form', id_form).del();
      await trx('responses').where('id_form', id_form).del();
      await trx('fields').where('id_form', id_form).del();

      // Supprimer le formulaire
      await trx('forms').where('id_form', id_form).del();
    });

    console.log(`Formulaire avec id_form = ${id_form} supprimé avec succès.`);
  } catch (err) {
    console.error('Erreur lors de la suppression :', err);
  }
};

/**
 * Fetch forms_id that have been responded to by a specific student.
 * @returns forms_id that have been responded to by a specific student.
 * @throws Error if the database query fails.
 */
export const getRespondedFormsIdByStudent = async (id_student: number): Promise<number[]> => {
  try {
    const ids = await db('students_forms')
    .select('students_forms.id_form')
    .leftJoin('token_used', 'students_forms.token', 'token_used.token')
    .where('students_forms.id_student', id_student)
    .whereNotNull('students_forms.token') // Exclure les tokens nulls
    .whereNotNull('token_used.token');
    console.log(ids);
    
    return ids.map(id => id.id_form);
  } catch (error) {
    console.error("Error fetching forms_id by student:", error);
    throw new Error("Could not fetch forms_id by student.");
  }
}