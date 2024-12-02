import {createFormWithFieldsAction, deleteFormAction, finalizeFormAction, getCourseWithoutFormAction, getFormWithFieldsAction, getFormsAction, updateFormWithFieldsAction} from '../controllers/forms';
import express, { Request, Response, Router } from 'express';

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

router.put('/update/:id_form', (req: Request, res: Response) => {
    updateFormWithFieldsAction(req, res);
});

router.put('/finalize/:id_form', (req: Request, res: Response) => {
    finalizeFormAction(req, res);
});

router.delete('/delete/:id_form', (req: Request, res: Response) => {
    deleteFormAction(req, res);
});



export default router;