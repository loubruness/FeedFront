import { Request, Response } from 'express';
import { getFormAverageGrades, getCourseName } from '../database/queries/report';
import PDFDocument from 'pdfkit'; 
import fs from 'fs';

//Generates a PDF report for average grades of a form.

export const generatePDFReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const id_form = parseInt(req.params.id_form, 10);
    const course_name = await getCourseName(id_form);   
    const averages = await getFormAverageGrades(id_form); 

    const outputFilePath = `Report_${course_name}.pdf`;
    const doc = new PDFDocument();

    const writeStream = fs.createWriteStream(outputFilePath);
    doc.pipe(writeStream);

    doc.fontSize(20).text(`Report of ${course_name}`, { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text('Questions', { continued: true });
    doc.text('Average Grade', { align: 'right' });
    doc.moveDown();

    averages.forEach(({ title, averageGrade }) => {
      doc.fontSize(12).text(title, { continued: true });
      doc.text(Number(averageGrade).toFixed(2), { align: 'right' });
    });

    doc.end();

    writeStream.on('finish', () => {
      res.status(200).json({ success: true, message: 'PDF generated successfully', filePath: outputFilePath });
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getCourseNameAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const id_form = parseInt(req.params.id_form, 10);
    const course_name = await getCourseName(id_form);
    res.status(200).json({ success: true, course_name });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};