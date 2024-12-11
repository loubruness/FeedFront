import database from "../database";

/**
 * Retrieves all courses from the database.
 *
 * @returns {Promise<any[]>} A promise that resolves to an array of all courses.
 */
export const getAllCourses = () => {
  return database("course").select("*");
};

/**
 * Retrieves a course from the database by its ID.
 *
 * @param {number} id - The ID of the course to retrieve.
 * @returns {Promise<any>} A promise that resolves to the course object if found, or undefined if not found.
 */
export const getCourseFromId = (id: number) => {
  return database("course").where({ id: id }).first();
};

/**
 * Retrieves a course from the database by its name.
 *
 * @param name - The name of the course to retrieve.
 * @returns A promise that resolves to the first course object that matches the given name.
 */
export const getCourseFromName = (name: string) => {
  return database("course").where({ name: name }).first();
};
