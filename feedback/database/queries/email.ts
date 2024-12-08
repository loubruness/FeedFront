import { db } from '../db_connection';

export const verifyTokenUsed = async (token: string): Promise<string> => {
    try {
        const result = await db('token_used').select('token').where({ token });
        return result[0];
    } catch (error) {
        return null;
    }
}

export const markTokenAsUsed = async (token: string): Promise<void> => {
    try {
        await db('token_used').insert({ token });
    } catch (error) {
        console.error("Error updating token:", error);
        throw new Error("Could not update token.");
    }
}