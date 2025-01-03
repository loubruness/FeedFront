import { useState, useEffect } from "react";
import { Form } from "@/types";
import { getForms, deleteForm, getCourseName } from "@/api/feedbackSystem";
import { useRouter } from 'next/navigation';
import { saveAs } from 'file-saver';


export const useDashboard = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const router = useRouter();
  
  const deleteFormHandler = async (id: number) => {
    if (confirm("Are you sure you want to delete this form?")) {
      await deleteForm(id);
      setForms(forms.filter((form) => form.id_form !== id));
    }
  };

  const generateReportHandler = async (id_form: number): Promise<void> => {
    try {
      // Trigger the backend API to generate and return the PDF report
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_BACK_ADDRESS}/report/${id_form}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to generate report: ${response.statusText}`);
      }

      // Get course name from the backend
      const { course_name } = await getCourseName(id_form);

      // Retrieve file name from Content-Disposition
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `Report_${course_name}.pdf`;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match) filename = match[1];
      }
  
      // Save the PDF as a file
      const blob = await response.blob();
      saveAs(blob, filename);
    } catch (error: any) {
      console.error('Error generating PDF:', error.message);
    }
  };
  

  useEffect(() => {
    getForms().then((data) => {
      setForms(data);
      // Sort forms by end_date
      setForms(data.sort((a:Form, b:Form) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime()));
    });
  }, []);

  const goToForm = (id: number) => {
    router.push(`/pages/FeedbackSystem?idForm=${id}`);
  };

  return { forms, goToForm, deleteFormHandler, generateReportHandler };
};