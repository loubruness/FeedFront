import { sendFormToStudentsByCourse, verifyToken, getStudentFormTokenFunction  } from '../controllers/email';

import { Router } from 'express';

const router = Router();

router.post("/sendFormToStudentsByCourse", sendFormToStudentsByCourse);
router.get("/verifyTokenForm", verifyToken);
router.get("/getStudentFormToken/:id_form", getStudentFormTokenFunction);

export default router;
