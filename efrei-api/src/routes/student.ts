import {
  getAllStudents,
  getStudentsByCourse,
} from "../controllers/studentsController";

import { Router } from "express";
import { authenticate } from "../middlewares/authentication";
import authorizations from "../util/authorizations";

const router = Router();

router.get("/", authenticate(authorizations.API_USER_READ), getAllStudents);
router.get("/getStudentsByCourse/:id", getStudentsByCourse);

export default router;
