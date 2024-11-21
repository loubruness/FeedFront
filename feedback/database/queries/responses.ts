import { db } from '../db_connection';

export type Grade = {
  id_field: number;
  grade: number;
};

export type Answer = {
  id_response: number;
  id_form: number;
  grades: Grade[];
};

export const createResponse = async (response: Answer): Promise<Answer> => {
  try {
    const { grades: grades, ...responseData } = response;
    const [{ id_response }] = await db('responses').insert(responseData).returning('id_response');
    const gradesWithId = grades.map((grade) => ({ ...grade, id_response, id_form: responseData.id_form }));
    await db('grades').insert(gradesWithId);
    return { ...response, id_response };
  } catch (error) {
    throw error;
  }
}