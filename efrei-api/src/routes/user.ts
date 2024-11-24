import { Router } from "express";
import { login, getUserCourses, getUser } from "../controllers/userController";
import authorizations from "../util/authorizations";
import { authenticate } from "../middlewares/authentication";

const router = Router();

router.post("/login", login);
router.get(
  "/:id/courses",
  authenticate(authorizations.API_USER_READ),
  getUserCourses
);
router.get("/:id", authenticate(authorizations.API_USER_READ), getUser);

export default router;
