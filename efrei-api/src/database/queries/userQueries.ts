import database from "../database";

export const getUserFromCredentials = (email: string, password: string) => {
  return database("efreiuser").where({ email, password }).first();
};

export const getUserFromId = (id: number) => {
  return database("efreiuser").where({ id: id }).first();
};
