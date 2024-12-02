import { getCourseId, getInfoCourse } from "../controllers/courseController";

import { Router } from "express";

const router = Router();

router.get("/getInfoCourse", getInfoCourse);
router.get("/getCourseId", getCourseId);

export default router;