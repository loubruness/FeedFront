import { Request, Response } from "express";

import db from "../util/database";

export const getInfoCourse = (req: Request, res: Response) => {
    const id_course = req.query.id_course;
    db("course")
        .where({ id: id_course })
        .first()
        .then((course: any) => {
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
    
        res.json({ name : course.name });
        });
};

export const getCourseId = (req: Request, res: Response) => {
    const name = req.query.name;
    db("course")
        .where({ name: name })
        .first()
        .then((course: any) => {
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
    
        res.json({ id_course : course.id });
        });
}
