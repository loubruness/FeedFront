import { Router } from 'express';
import {getFormsAction} from '../controllers/forms';

const router = Router();

router.get('/', (req, res) => {
    getFormsAction(req, res);  
});



export default router;