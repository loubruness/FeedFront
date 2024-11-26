import { send, sendFormEmail } from '../controllers/email';

import { Router } from 'express';

const router = Router();

router.post("/send", send);
router.post("/sendFormEmail", sendFormEmail);

export default router;
