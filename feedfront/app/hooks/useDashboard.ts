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
      // Trigger the backend API to generate and return the PDF
      const response = await fetch(`${process.env.API_HOST}/report/${id_form}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to generate report: ${response.statusText}`);
      }
      
      const { course_name } = await getCourseName(id_form);

      // Save the PDF as a file
      const blob = await response.blob();
      saveAs(blob, `Report_${course_name}.pdf`);
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