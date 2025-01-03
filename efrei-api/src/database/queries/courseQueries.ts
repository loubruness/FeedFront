import database from "../database";

export const getAllCourses = () => {
  return database("course").select("*");
};

export const getCourseFromId = (id: number) => {
  return database("course").where({ id: id }).first();
};

export const getCourseFromName = (name: string) => {
  return database("course").where({ name: name }).first();
};
