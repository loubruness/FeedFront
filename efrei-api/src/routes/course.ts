import { Router } from "express";
import { getInfoCourse } from "../controllers/courseController";

const router = Router();

router.get("/getInfoCourse", getInfoCourse);

export default router;