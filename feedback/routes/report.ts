import express, { Request, Response, Router } from 'express';
import { getGradesFieldsonly, getGradesEntireForm, getAverageForm, generateReport} from '../controllers/report';

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to report routes");
});

router.get('/:id_form/:id_field', (req: Request, res: Response) => {
    getGradesFieldsonly(req, res);
});

// router.get("/:id_form", (req, res) => {
//     getGradesEntireForm(req, res);
// });

// router.get("/:id_form", (req, res) => {
//     getAverageForm(req, res);
// });



// router.get("/:id_form", (req, res) => {
//     generateReport(req, res);
// });

router.get("/:id_form", (req, res) => {
    generateReport(req, res);
});

export default router;