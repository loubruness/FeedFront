import { Router } from 'express';
import { createResponseAction } from '../controllers/responses';

const router = Router();

router.post('/', (req, res) => {
    createResponseAction(req, res);
});

export default router;