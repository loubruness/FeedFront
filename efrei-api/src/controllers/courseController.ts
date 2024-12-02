import { Request, Response } from "express";
import {
  getCourseFromId,
  getCourseFromName,
} from "../database/queries/courseQueries";

export const getInfoCourse = (request: Request, response: Response) => {
  const id_course = request.query.id_course;

  // Validate input
  if (id_course === undefined) {
    response.status(400).json({ message: "Missing id_course parameter" });
    return;
  }

  getCourseFromId(+id_course).then((course: any) => {
    if (!course) {
      response.status(404).json({ message: "Course not found" });
      return;
    }

    response.json({ name: course.name });
  });
};

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
