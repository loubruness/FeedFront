import { Request, Response } from "express";

import database from "../database/database";

export const getAllStudents = (req: Request, res: Response) => {
  res.json({ students: ["Uncle Bob"] });
};

export const getStudentsByCourse = (req: Request, res: Response) => {
  database("course")
    .where({ id: +req.params.id })
    .first()
    .then((course: any) => {
      if (!course) {
        res.status(404).json({ message: "Course not found" });
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
          res.json({ students });
        })
        .catch((err: any) => {
          console.error(err);
          res
            .status(500)
            .json({ error: "An error occurred while fetching students" });
        });
    });
};
