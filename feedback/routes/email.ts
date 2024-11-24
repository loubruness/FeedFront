import { Router } from 'express';
import { send } from '../controllers/email';

const router = Router();

router.post("/send", send);

export default router;
