import { getStudentsByCourse } from "../controllers/studentsController";

import { Router } from "express";
import { authenticate } from "../middlewares/authentication";
import authorizations from "../util/authorizations";

const router = Router();

router.get(
  "/getStudentsByCourse/:id",
  authenticate(authorizations.API_USER_READ, authorizations.API_COURSE_READ),
  getStudentsByCourse
);

export default router;
