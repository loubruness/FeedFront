import { useState, useEffect } from "react";
import { Form } from "@/types";

import { getForms } from "@/api/feedbackSystem";
import { useRouter } from 'next/navigation';

export const useDashboard = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const router = useRouter();

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

  return { forms, goToForm };
};