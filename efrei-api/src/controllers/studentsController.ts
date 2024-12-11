import { Request, Response } from "express";

import database from "../database/database";

/**
 * Retrieves students by course ID.
 *
 * @param request - The request object containing the course ID in the parameters.
 * @param response - The response object used to send the response.
 *
 * @returns A JSON response containing the list of students enrolled in the specified course.
 *
 * @remarks
 * This function first checks if the course with the given ID exists. If the course is not found,
 * it sends a 404 response. If the course is found, it retrieves the students enrolled in the course
 * and sends them in the response. If an error occurs during the database operations, it sends a 500 response.
 *
 * @example
 * // Example request:
 * // GET /courses/1/students
 * // Response:
 * // {
 * //   "students": [
 * //     { "id": 1, "email": "student@efrei.net", "role": "student" },
 * //     { "id": 2, "email": "student2@efrei.net", "role": "student" }
 * //   ]
 * // }
 */
export const getStudentsByCourse = (request: Request, response: Response) => {
  database("course")
    .where({ id: +request.params.id })
    .first()
    .then((course: any) => {
      if (!course) {
        response.status(404).json({ message: "Course not found" });
        return;
      }

      database("efreiuser")
        .join(
          "efreiuser_course",
          "efreiuser.id",
          "efreiuser_course.efreiuser_id"
        )
        .where("efreiuser_course.course_id", course.id)
        .select("efreiuser.id", "efreiuser.email", "efreiuser.role")
        .where("efreiuser.role", "student")
        .then((students: any) => {
          response.json({ students });
        })
        .catch((err: any) => {
          console.error(err);
          response
            .status(500)
            .json({ error: "An error occurred while fetching students" });
        });
    });
};
