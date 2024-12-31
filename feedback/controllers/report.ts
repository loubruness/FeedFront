import { Request, Response } from 'express';
import { getFormAverageGrades, getCourseName } from '../database/queries/report';
import PDFDocument from 'pdfkit'; 

// Generates a PDF report for average grades of a form and send the file to the client
export const generatePDFReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const id_form = parseInt(req.params.id_form, 10);
    const course_name = await getCourseName(id_form);
    const averages = await getFormAverageGrades(id_form);

    const doc = new PDFDocument();

    // Set headers for PDF response
    res.setHeader('Content-Type', 'application/pdf');
    const sanitizedCourseName = course_name.replace(/[^a-zA-Z0-9-_ ]/g, '_'); // Replace special characters with '_'
    res.setHeader('Content-Disposition', `attachment; filename="Report_${sanitizedCourseName}.pdf"`);

    // Pipe the PDF directly to the response
    doc.pipe(res);

    // Generate the PDF content
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
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Get the course name of a form
export const getCourseNameAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const id_form = parseInt(req.params.id_form, 10);
    const course_name = await getCourseName(id_form);
    res.status(200).json({ success: true, course_name });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};