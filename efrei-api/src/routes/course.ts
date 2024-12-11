import {
  getAllCourses,
  getCourseId,
  getInfoCourse,
} from "../controllers/courseController";

import { Router } from "express";
import authorizations from "../util/authorizations";
import { authenticate } from "../middlewares/authentication";

const router = Router();

router.get("/", authenticate(authorizations.API_COURSE_READ), getAllCourses);
router.get(
  "/getInfoCourse",
  authenticate(authorizations.API_COURSE_READ),
  getInfoCourse
);
router.get(
  "/getCourseId",
  authenticate(authorizations.API_COURSE_READ),
  getCourseId
);

export default router;
