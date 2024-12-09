import { db } from '../db_connection';

/**
 * Verify if a token has been used.
 * @param token - The token to verify.
 * @returns The token if it has been used, otherwise null.
 * @throws Error if the verification operation fails.
 */
export const verifyTokenUsed = async (token: string): Promise<string> => {
    try {
        const result = await db('token_used').select('token').where({ token });
        return result[0];
    } catch (error) {
        return null;
    }
}

/**
 * Mark a token as used in the database.
 * @param token - The token to mark as used.
 * @throws Error if the update operation fails.
 */
export const markTokenAsUsed = async (token: string): Promise<void> => {
    try {
        await db('token_used').insert({ token });
    } catch (error) {
        console.error("Error updating token:", error);
        throw new Error("Could not update token.");
    }
}

/**
 * Store a token associated with a student and form in the database.
 * @param id_student - The ID of the student.
 * @param id_form - The ID of the form.
 * @param token - The token to store.
 * @throws Error if the storing operation fails.
 */
export const storeTokenForm = async (id_student, id_form, token) => {
    try {
        await db('students_forms').insert({ id_student, id_form, token });
    } catch (error) {
        console.error("Error storing token:", error);
        throw new Error("Could not store token.");
    }
}

/**
 * Get the token associated with a student and form from the database.
 * @param id_student - The ID of the student.
 * @param id_form - The ID of the form.
 * @returns The token if it exists, otherwise null.
 * @throws Error if the retrieval operation fails.
 */
export const getStudentFormToken = async (id_student, id_form) => {
    try {
        const result = await db('students_forms').select('token').where({ id_student, id_form });
        return result[0];
    } catch (error) {
        return null;
    }
}