import { db } from '../db_connection';

export type Note = {
  id_field: number;
  name: string;
  question: string;
  note: number;
};

export type Response = {
  id_response: number;
  course_name: string;
  form_id: number;
  notes: Note[];
};

export const createResponse = async (response: Response): Promise<Response> => {
  const { notes, ...responseData } = response;
  const [id_response] = await db('responses').insert(responseData).returning('id_response');
  const notesWithId = notes.map((note) => ({ ...note, id_response }));
  await db('notes').insert(notesWithId);
  return { ...response, id_response };
}