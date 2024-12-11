import database from "../database";

/**
 * Retrieves a user from the database using the provided email and password.
 *
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns A promise that resolves to the user object if found, otherwise undefined.
 */
export const getUserFromCredentials = (email: string, password: string) => {
  return database("efreiuser").where({ email, password }).first();
};

/**
 * Retrieves a user from the database by their ID.
 *
 * @param {number} id - The ID of the user to retrieve.
 * @returns {Promise<any>} A promise that resolves to the user object if found, otherwise null.
 */
export const getUserFromId = (id: number) => {
  return database("efreiuser").where({ id: id }).first();
};
