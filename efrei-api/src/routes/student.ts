import { Router } from "express";
import { getAllStudents } from "../controllers/studentsController";
import { authenticate } from "../middlewares/authentication";
import authorizations from "../util/authorizations";

const router = Router();

router.get("/", authenticate(authorizations.API_USER_READ), getAllStudents);

export default router;
