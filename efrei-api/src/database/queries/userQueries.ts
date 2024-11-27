import db from "../database";

export const getUserFromCredentials = (email: string, password: string) => {
  return db("efreiuser").where({ email, password }).first();
};

export const getUserFromId = (id: number) => {
  return db("efreiuser").where({ id: id }).first();
};
