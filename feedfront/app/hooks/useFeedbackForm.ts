import { useState, useEffect } from "react";
import { Field, FormWithFields, Answer } from "@/types";
import { loadForm, saveForm, submitAnswer } from "@/api/feedbackSystem";

export const useFeedbackForm = (initialIdForm: number) => {
  const [idForm, setIdForm] = useState(initialIdForm);
  const [formTitle, setFormTitle] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [userRole, setUserRole] = useState("admin");

  const loadFormHandler = async () => {
    const data = await loadForm(idForm);
    setFormTitle(data.course_name);
    setFields(data.fields);
  };

  const saveFormHandler = () => {
    const formToSave: FormWithFields = { id_form: idForm, course_name: formTitle, fields };
    saveForm(formToSave);
  };

  const sendFormHandler = () => alert("Form Sent Successfully!");

  const submitAnswerHandler = () => {
    const scores = fields.map((q) => {
      const score = (
        document.querySelector(`input[name="q${q.id_field}"]:checked`) as HTMLInputElement
      )?.value || null;
      return { id: q.id_field, score };
    });

    if (scores.some((s) => s.score === null)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const answer: Answer = {
      id_form: idForm,
      grades: scores.map((s) => ({ id_field: s.id, grade: parseInt(s.score || "3") })),
    };
    submitAnswer(answer);
  };

  const updateFieldHandler = (id: number, key: string, value: string) => {
    if (userRole === "admin") {
      setFields((prev) =>
        prev.map((field) =>
          field.id_field === id ? { ...field, [key]: value } : field
        )
      );
    }
  };

  const addFieldHandler = () => {
    if (userRole === "admin") {
      const newId = fields.length ? fields[fields.length - 1].id_field + 1 : 1;
      setFields([
        ...fields,
        { id_field: newId, title: `Question ${newId}`, question: "Enter your question here..." },
      ]);
    }
  };

  const deleteFieldHandler = (id: number) => {
    if (userRole === "admin") {
      setFields((prev) => prev.filter((field) => field.id_field !== id));
    }
  };

  useEffect(() => {
    loadFormHandler();
  }, [idForm]);

  return {
    idForm,
    formTitle,
    fields,
    userRole,
    setUserRole,
    setFormTitle,
    addFieldHandler,
    updateFieldHandler,
    deleteFieldHandler,
    saveFormHandler,
    sendFormHandler,
    submitAnswerHandler,
    setIdForm,
  };
};
