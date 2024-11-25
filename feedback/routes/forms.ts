import express, { Request, Response, Router } from 'express';
import {getFormsAction, getFormWithFieldsAction, createFormWithFieldsAction, updateFormWithFieldsAction, deleteFormAction, getCourseWithoutFormAction} from '../controllers/forms';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    getFormsAction(req, res);  
});

router.get('/coursesWithoutForm', (req: Request, res: Response) => {
    getCourseWithoutFormAction(req, res);
});

router.get('/:id_form', (req: Request, res: Response) => {
    getFormWithFieldsAction(req, res);
});

router.post('/create', (req: Request, res: Response) => {
    createFormWithFieldsAction(req, res);
});

router.post('/update', (req: Request, res: Response) => {
    updateFormWithFieldsAction(req, res);
});

router.delete('/:id_form', (req: Request, res: Response) => {
    deleteFormAction(req, res);
});



export default router;