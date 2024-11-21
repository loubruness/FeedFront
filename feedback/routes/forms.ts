import { Router } from 'express';
import {getFormsAction, getFormWithFieldsAction, createFormWithFieldsAction} from '../controllers/forms';

const router = Router();

router.get('/', (req, res) => {
    getFormsAction(req, res);  
});

router.get('/:id_form', (req, res) => {
    getFormWithFieldsAction(req, res);
});

router.post('/', (req, res) => {
    createFormWithFieldsAction(req, res);
});

export default router;