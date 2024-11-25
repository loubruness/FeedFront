import { Request, Response, Router } from 'express';
import {decryptUserRole, login} from '../controllers/auth';

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to the travel route");
});

router.post('/login', login);
router.get('/decryptUserRole', decryptUserRole);

export default router;