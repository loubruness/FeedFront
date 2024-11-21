import { Request, Response } from "express";

export const getAllStudents = (req: Request, res: Response) => {
  res.json({ students: ["Uncle Bob"] });
};
