import { Request, Response } from 'express';
import {getGradesField, getGradesForm, getGradesFormAverage } from '../database/queries/report';
import PDFDocument from 'pdfkit'; 
import fs from 'fs';

export type AverageGrade = { 
  id_field: number; 
  average_grade: number 
};

export async function getGradesFieldsonly(req: Request, res: Response){
  try {
    const idForm = parseInt(req.params.id_form, 10);
    const idField = parseInt(req.params.id_field, 10);
    res.status(200).json(await getGradesField(idForm, idField));
  } 
  catch (error) {
    res.status(500).json({ error: error.message });//or error:error
  }
};

export async function getGradesEntireForm(request: Request, response: Response){
  try {
      console.log(request.params); // Log the request parameters for debugging
      const idForm = parseInt(request.params.id_form, 10);

      // Execute the query to get grades
      const grades = await getGradesForm(idForm);

      // Respond with the grades
      response.status(200).json({
          info: "Grades fetched successfully",
          grades: grades,
      });
  } catch (error: any) {
      console.error(error.message); // Log the error for debugging
      response.status(500).json({ error: error.message});
  }
};

export async function getAverageForm(request: Request, response: Response){
  try {
      console.log(request.params); // Log the request parameters for debugging
      const idForm = parseInt(request.params.id_form, 10);

      // Execute the query to get grades
      const grades = await getGradesFormAverage(idForm);

      // Respond with the grades
      response.status(200).json({
          info: "Average fetched successfully",
          grades: grades,
      });
  } catch (error: any) {
      console.error(error.message); // Log the error for debugging
      response.status(500).json({ error: error.message});
  }
};


export async function generateReport(request: Request, response: Response) {
  try {
    const id_form = parseInt(request.params.id_form);
    const outputFilePath = `grade_averages_form_${id_form}.pdf`;

    // Fetch average grades using the provided query function
    const averages: AverageGrade[] = await getGradesFormAverage(id_form);

    // Create a new PDF document
    const doc = new PDFDocument();

    // Stream the PDF to a file
    const writeStream = fs.createWriteStream(outputFilePath);
    doc.pipe(writeStream);

    // Add a title to the PDF
    doc.fontSize(20).text(`Grade Averages for Form ${id_form}`, { align: 'center' });

    // Add a line break
    doc.moveDown();

    // Add table headers
    doc.fontSize(14).text('Field ID', { continued: true });
    doc.text('Average Grade', { align: 'right' });

    doc.moveDown();

    // Add the averages to the PDF
    averages.forEach(({ id_field, average_grade }) => {
      const numericAverage = Number(average_grade); // Ensure average_grade is numeric
      doc.fontSize(12).text(id_field.toString(), { continued: true });
      doc.text(numericAverage.toFixed(2), { align: 'right' });
    });

    // Finalize the PDF and close the document
    doc.end();

    // Notify when the PDF is created successfully
    writeStream.on('finish', () => {
      console.log(`PDF created successfully at ${outputFilePath}`);
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
