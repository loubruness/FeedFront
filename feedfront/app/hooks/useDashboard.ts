import { useState, useEffect } from "react";
import { Form } from "@/types";

import { getForms } from "@/api/feedbackSystem";
import { deleteForm } from "@/api/feedbackSystem";
import { useRouter } from 'next/navigation';

export const useDashboard = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const router = useRouter();
  const deleteFormHandler = async (id: number) => {
    if (confirm("Are you sure you want to delete this form?")) {
      await deleteForm(id);
      setForms(forms.filter((form) => form.id_form !== id));
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

  return { forms, goToForm, deleteFormHandler };
};