import express, { Router } from 'express';
import { generatePDFReport } from '../controllers/report';

const router = Router();
router.get('/:id_form', generatePDFReport);

export default router;