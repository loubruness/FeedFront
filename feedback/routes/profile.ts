import { Router } from 'express';
import { getProfileInfos } from '../controllers/profile';

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to the travel route");
});

router.post('/getProfileInfos', getProfileInfos);

export default router;