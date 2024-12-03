import {
  getAllCourses,
  getCourseId,
  getInfoCourse,
} from "../controllers/courseController";

import { Router } from "express";

const router = Router();

router.get("/", getAllCourses);
router.get("/getInfoCourse", getInfoCourse);
router.get("/getCourseId", getCourseId);

export default router;
