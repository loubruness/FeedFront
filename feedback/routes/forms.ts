import express, { Request, Response, Router } from 'express';
import {getFormsAction, getFormWithFieldsAction, saveFormWithFieldsAction} from '../controllers/forms';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    getFormsAction(req, res);  
});

router.get('/:id_form', (req: Request, res: Response) => {
    getFormWithFieldsAction(req, res);
});

router.post('/', (req: Request, res: Response) => {
    saveFormWithFieldsAction(req, res);
});

export default router;