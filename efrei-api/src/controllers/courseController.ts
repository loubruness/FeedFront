import { Request, Response } from "express";
import {
  getCourseFromId,
  getCourseFromName,
  getAllCourses as getAllCoursesDBQuery,
} from "../database/queries/courseQueries";

/**
 * Retrieves all courses from the database and sends them in the response.
 *
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 * @returns {void}
 */
export const getAllCourses = (request: Request, response: Response) => {
  getAllCoursesDBQuery().then((courses: any) => {
    response.json({ courses });
  });
};

/**
 * Retrieves information about a course based on the provided course ID.
 *
 * @param request - The HTTP request object, containing the query parameter `id_course`.
 * @param response - The HTTP response object used to send back the desired course information or error messages.
 *
 * @remarks
 * The function expects a query parameter `id_course` to be present in the request.
 * If the `id_course` parameter is missing, it responds with a 400 status code and an error message.
 * If the course with the given ID is not found, it responds with a 404 status code and an error message.
 * If the course is found, it responds with the course name in JSON format.
 *
 * @example
 * // Example request:
 * // GET /course/getInfoCourse?id_course=123
 *
 * // Example response:
 * // {
 * //   "name": "Introduction to Programming"
 * // }
 */
export const getInfoCourse = (request: Request, response: Response) => {
  const idCourse = request.query.id_course;

  // Validate input
  if (idCourse === undefined) {
    response.status(400).json({ message: "Missing id_course parameter" });
    return;
  }

  getCourseFromId(+idCourse).then((course: any) => {
    if (!course) {
      response.status(404).json({ message: "Course not found" });
      return;
    }

    response.json({ name: course.name });
  });
};

/**
 * Handles the request to get a course ID by its name.
 *
 * @param request - The request object containing the query parameter `name`.
 * @param response - The response object used to send back the appropriate HTTP response.
 *
 * @remarks
 * This function validates the input to ensure the `name` parameter is provided.
 * If the `name` parameter is missing, it responds with a 400 status code and an error message.
 * If the course is not found, it responds with a 404 status code and an error message.
 * If the course is found, it responds with the course ID in JSON format.
 *
 * @example
 * // Example request:
 * // GET /course/getCourseId?name=exampleCourseName
 *
 * // Example response:
 * // {
 * //   "id_course": 123
 * // }
 */
export const getCourseId = (request: Request, response: Response) => {
  const name = request.query.name;

  // Validate input
  if (name === undefined) {
    response.status(400).json({ message: "Missing name parameter" });
    return;
  }

  getCourseFromName(name as string).then((course: any) => {
    if (!course) {
      response.status(404).json({ message: "Course not found" });
      return;
    }

    response.json({ id_course: course.id });
  });
};
