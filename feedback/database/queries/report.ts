import { db } from '../db_connection';

export type FieldGrade = {
  id_response: number;
  grade: number;
};

export type Grade = { 
  id_field: number; 
  id_response: number; 
  grade: number 
  };

export type AverageGrade = { 
  id_field: number; 
  average_grade: number 
};
  
  export const getGradesField = async (id_form: number, id_field: number): Promise<FieldGrade[]> => {
    try {
      return await db('grades')
        .select('id_response', 'grade')
        .where({
          id_form: id_form,
          id_field: id_field,
        });
    } catch (error) {
      throw error;
    }
  };
  
  export const getGradesForm = async (id_form: number): Promise<Grade[]> => {
    try {
      return await db('grades')
        .select('id_response', 'id_field', 'grade') // Include id_field
        .where({
          id_form: id_form, // Only filter by id_form
        });
    } catch (error) {
      throw error;
    }
  };

export const getGradesFormAverage = async (id_form: number): Promise<AverageGrade[]> => {
  try {
    return await db('grades')
      .select('id_field')
      .avg('grade as average_grade') // Calculate the average grade
      .where({ id_form: id_form }) // Filter by id_form
      .groupBy('id_field'); // Group by field
  } catch (error) {
    throw error;
  }
};
