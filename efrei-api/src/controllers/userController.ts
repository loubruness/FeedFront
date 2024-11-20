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

export const login = (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = usersList.find(
    (user) => user.email === email && user.password === password
  );

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
  });
};
