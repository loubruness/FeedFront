import { Request, Response } from "express";
import roles from "../util/roles";
import { User } from "../util/user";

// TODO: Move this somewhere else once the database is done
const usersList: Array<User> = [
  new User(1, "Admin", "ADMIN", "admin@efrei.fr", "pass", roles.ADMIN),
  new User(2, "Admin2", "ADMIN2", "admin2@efrei.fr", "pass", roles.ADMIN),
  new User(3, "Teacher", "TEACHER", "teacher@efrei.fr", "pass", roles.TEACHER),
  new User(
    4,
    "Teacher2",
    "TEACHER2",
    "teacher2@efrei.fr",
    "pass",
    roles.TEACHER
  ),
  new User(5, "Student", "STUDENT", "student@efrei.net", "pass", roles.STUDENT),
  new User(
    6,
    "Student2",
    "STUDENT2",
    "student2@efrei.net",
    "pass",
    roles.STUDENT
  ),
];

const userCourses = [
  {
    userId: 3,
    courses: [
      {
        id: 1,
        name: "Math",
        teachers: [3, 4],
      },
    ],
  },
  {
    userId: 4,
    courses: [
      {
        id: 1,
        name: "Math",
        teachers: [3, 4],
      },
      {
        id: 2,
        name: "Physics",
        teachers: [4],
      },
    ],
  },
  {
    userId: 5,
    courses: [
      {
        id: 1,
        name: "Math",
        teachers: [3, 4],
      },
      {
        id: 2,
        name: "Physics",
        teachers: [4],
      },
    ],
  },
];

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

  const user = usersList.find(
    (user) => user.email === email && user.password === password
  );

  // No user found with the provided credentials
  if (!user) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }

  // Return appropriate user information
  res.json({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
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
  const user = usersList.find((user) => user.id === +req.params.id);

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
  const userCourseList = userCourses.find((uc) => uc.userId === user.id);
  res.json({ courses: userCourseList?.courses || [] });
};
