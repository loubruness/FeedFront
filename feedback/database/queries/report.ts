import { db } from '../db_connection';

//Represents the average grade of a specific field.
 
export type AverageGrade = { 
  title: String; 
  averageGrade: number;
};

//Retrieves average grades for all fields in a form.

export const getFormAverageGrades = async (id_form: number): Promise<AverageGrade[]> => {
  return await db('grades')
    .select('fields.title as title')
    .avg('grades.grade as averageGrade')
    .join('fields', 'grades.id_field', 'fields.id_field')
    .where('fields.id_form', id_form)
    .groupBy('fields.title');
};

//Retrieve the name of the course associated with a form.

export const getCourseName = async (id_form: number): Promise<string> => {
  const result = await db('forms')
    .select('course_name')
    .where('id_form', id_form)
    .first();

  return result?.course_name || ''; // Safely access course_name and handle undefined
};
