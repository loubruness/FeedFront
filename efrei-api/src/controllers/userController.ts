import { Request, Response } from "express";

import { User } from "../util/user";
import database from "../database/database";
import {
  getUserFromCredentials,
  getUserFromId,
} from "../database/queries/userQueries";
import roles from "../util/roles";

/**
 * Handles user login by validating the provided email and password.
 *
 * @param request - The request object containing the login credentials in the body.
 * @param response - The response object used to send back the appropriate user information or an error message.
 *
 * @remarks
 * This function searches for a user in the `usersList` with the provided email and password.
 * If a matching user is found, it returns the user's information.
 * If no matching user is found, it returns a 401 status with an "Invalid username or password" message.
 *
 * @example
 * // Example request body
 * {
 *   "email": "user@example.com",
 *   "password": "password123"
 * }
 *
 * // Example response for a successful login
 * {
 *   "id": 1,
 *   "firstname": "John",
 *   "lastname": "Doe",
 *   "email": "user@example.com",
 *   "role": "admin"
 * }
 *
 * // Example response for an unsuccessful login
 * {
 *   "message": "Invalid username or password"
 * }
 */
export const login = (request: Request, response: Response) => {
  // Get login credentials from the request body
  const { email, password } = request.body;

  getUserFromCredentials(email, password).then((user: User) => {
    if (!user) {
      response.status(401).json({ message: "Invalid username or password" });
      return;
    }

    response.json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    });
  });
};

/**
 * Retrieves the courses for a specific user based on their ID.
 * If the user is a student, the courses returned are the ones they are enrolled in.
 * If the user is a teacher, the courses returned are the ones they are teaching.
 *
 * @param request - The request object containing the user ID in the parameters.
 * @param response - The response object used to send back the user's courses or an error message.
 *
 * @remarks
 * - If the user is not found, a 404 status with a "User not found" message is returned.
 * - If the user is an admin, a 403 status with an "Admins do not have courses" message is returned.
 * - If the user is found and is not an admin, their courses are returned in the response.
 *
 * @returns The user's courses or an appropriate error message.
 */
export const getUserCourses = (request: Request, response: Response) => {
  // Get the user from the id
  getUserFromId(+request.params.id).then((user: User) => {
    // If the user is not found
    if (!user) {
      response.status(404).json({ message: "User not found" });
      return;
    }

    if (user.role === roles.ADMIN) {
      response.status(403).json({ message: "Admins do not have courses" });
      return;
    }

    // Return the user's courses
    database("course")
      .join(
        "efreiuser_course as student_courses",
        "course.id",
        "student_courses.course_id"
      )
      .join(
        "efreiuser as students",
        "student_courses.efreiuser_id",
        "students.id"
      )
      .leftJoin(
        "efreiuser_course as teacher_courses",
        "course.id",
        "teacher_courses.course_id"
      )
      .leftJoin("efreiuser as teachers", function (this: any) {
        this.on("teacher_courses.efreiuser_id", "=", "teachers.id").andOn(
          "teachers.role",
          "=",
          database.raw("'teacher'")
        );
      })
      .where("students.id", user.id)
      .groupBy("course.id", "course.name")
      .select([
        "course.id as course_id",
        "course.name as name",
        database.raw(
          "json_agg(teachers.id) FILTER (WHERE teachers.id IS NOT NULL) as teacher_ids"
        ),
      ])
      .then((results: any) => {
        response.json({ courses: results });
      })
      .catch((error: any) => {
        console.error(error);
        response
          .status(500)
          .json({ error: "An error occurred while fetching courses" });
      });
  });
};

/**
 * Retrieves a user by their ID from the database and sends the user data as a JSON response.
 *
 * @param request - The request object, containing the user ID in the request parameters.
 * @param response - The response object, used to send the JSON response.
 *
 * @remarks
 * This function queries the "efreiuser" table in the database to find a user with the specified ID.
 * If the user is found, their details (firstname, lastname, email, role, and level) are sent in the response.
 * If the user is not found, a 404 status code and an error message are sent in the response.
 *
 * @example
 * // Example request URL: /user/1
 * // Example response:
 * // {
 * //   "firstname": "John",
 * //   "lastname": "Doe",
 * //   "email": "john.doe@example.com",
 * //   "role": "student",
 * //   "level": 3
 * // }
 */
export const getUser = (request: Request, response: Response) => {
  // Get the user from the id
  getUserFromId(+request.params.id).then((user: User) => {
    // If the user is not found
    if (!user) {
      response.status(404).json({ message: "User not found" });
      return;
    }

    // If the user is found, return it.
    response.json({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  });
};
