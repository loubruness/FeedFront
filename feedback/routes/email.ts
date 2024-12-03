import { send, sendFormEmail, sendFormToStudentsByCourse } from '../controllers/email';

import { Router } from 'express';

const router = Router();

router.post("/send", send);
router.post("/sendFormEmail", sendFormEmail);
router.post("/sendFormToStudentsByCourse", sendFormToStudentsByCourse);

export default router;
