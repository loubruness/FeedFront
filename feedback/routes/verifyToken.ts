import { Request, Response, Router } from 'express';

import {testVerifyToken} from '../controllers/verifyToken';

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to the travel route");
});

router.post('/testVerifyToken', testVerifyToken)

export default router;