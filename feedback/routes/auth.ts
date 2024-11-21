import { Request, Response, Router } from 'express';

import {login} from '../controllers/auth';

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to the travel route");
});

router.post('/login', login);

export default router;