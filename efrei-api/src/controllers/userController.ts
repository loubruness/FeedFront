import { Request, Response } from "express";
import roles from "../util/roles";
import { User } from "../util/user";
import db from "../util/database";

/**
 * Handles user login by validating the provided email and password.
 *
 * @param req - The request object containing the login credentials in the body.
 * @param res - The response object used to send back the appropriate user information or an error message.
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
export const login = (req: Request, res: Response) => {
  // Get login credentials from the request body
  const { email, password } = req.body;

  db("efreiuser")
    .where({ email, password })
    .first()
    .then((user: User) => {
      if (!user) {
        res.status(401).json({ message: "Invalid username or password" });
        return;
      }

      res.json({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        level: user.level,
      });
    });
};

/**
 * Retrieves the courses for a specific user based on their ID.
 * If the user is a student, the courses returned are the ones they are enrolled in.
 * If the user is a teacher, the courses returned are the ones they are teaching.
 *
 * @param req - The request object containing the user ID in the parameters.
 * @param res - The response object used to send back the user's courses or an error message.
 *
 * @remarks
 * - If the user is not found, a 404 status with a "User not found" message is returned.
 * - If the user is an admin, a 403 status with an "Admins do not have courses" message is returned.
 * - If the user is found and is not an admin, their courses are returned in the response.
 *
 * @returns The user's courses or an appropriate error message.
 */
export const getUserCourses = (req: Request, res: Response) => {
  // Get the user from the id
  db("efreiuser")
    .where({ id: +req.params.id })
    .first()
    .then((user: User) => {
      // If the user is not found
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (user.role === roles.ADMIN) {
        res.status(403).json({ message: "Admins do not have courses" });
        return;
      }

      // Return the user's courses
      db("course")
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
            db.raw("'teacher'")
          );
        })
        .where("students.id", user.id)
        .groupBy("course.id", "course.name")
        .select([
          "course.id as course_id",
          "course.name as course_name",
          db.raw(
            "json_agg(teachers.id) FILTER (WHERE teachers.id IS NOT NULL) as teacher_ids"
          ),
        ])
        .then((results: any) => {
          res.json({ courses: results });
        })
        .catch((err: any) => {
          console.error(err);
          res
            .status(500)
            .json({ error: "An error occurred while fetching courses" });
        });
    });
};
