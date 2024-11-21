import { Router } from "express";
import { login, getUserCourses } from "../controllers/userController";
import authorizations from "../util/authorizations";
import { authenticate } from "../middlewares/authentication";

const router = Router();

router.post("/login", login);
router.get(
  "/:id/courses",
  authenticate(authorizations.API_STUDENT_READ),
  getUserCourses
);

export default router;
