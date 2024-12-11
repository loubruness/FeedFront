import express, { Router } from 'express';
import { generatePDFReport, getCourseNameAction } from '../controllers/report';

const router = Router();
router.get('/:id_form', generatePDFReport);
router.get('/courseName/:id_form', getCourseNameAction);

export default router;