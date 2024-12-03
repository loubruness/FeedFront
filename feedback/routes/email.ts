import { send, sendFormEmail, sendFormToStudentsByCourse, verifyToken } from '../controllers/email';

import { Router } from 'express';

const router = Router();

router.post("/send", send);
router.post("/sendFormEmail", sendFormEmail);
router.post("/sendFormToStudentsByCourse", sendFormToStudentsByCourse);
router.get("/verifyToken", verifyToken);

export default router;
