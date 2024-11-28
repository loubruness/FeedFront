import { useState, useEffect } from "react";
import { Field, FormWithFields, Answer } from "@/types";
import { loadForm, createForm, updateForm, submitAnswer, getCourseOptions, finalizeForm } from "@/api/feedbackSystem";
import { useRouter, useSearchParams } from 'next/navigation';


export const useFeedbackForm = () => {
  const [idForm, setIdForm] = useState(1);
  const [formTitle, setFormTitle] = useState("");
  const [loadedFormTitle, setLoadedFormTitle] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);
  const [userRole, setUserRole] = useState("admin");
  const [isCreatingForm, setIsCreatingForm] = useState(true);
  const [courseOptions, setCourseOptions] = useState<string[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const getFormId = () => {
    const urlId = searchParams.get("idForm") as number | null;
    if (urlId) {
      setIdForm(urlId);
      setIsCreatingForm(false);
    }
    else {
      setIsCreatingForm(true);
    }
  };

  const loadFormHandler = async () => {  
    try {
      const data = await loadForm(idForm);
      setLoadedFormTitle(data.course_name);
      setFormTitle(data.course_name);
      setFields(data.fields);
    } catch (error) {
      alert("Failed to load the form "+idForm+". Redirecting to create page.");
      router.push("./FeedbackSystem");
    }
  };

  const loadCourseOptions = async () => {
    const data = await getCourseOptions();
    setCourseOptions([loadedFormTitle, ...data]);
  }

  const saveFormHandler = async () => {
    if (isCreatingForm && (!formTitle || formTitle === "Default")) {
      alert("Please select a course name for the form.");
      return;
    }
    if (isCreatingForm && idForm === 0 && formTitle !== "Default") {
      alert("You should note change the class name of the Default form.");
    }
    const formToSave: FormWithFields = { id_form: idForm, course_name: formTitle, fields };
    if (isCreatingForm) {
      const newForm = await createForm(formToSave);
      router.push(`/pages/FeedbackSystem?idForm=${newForm.id_form}`);
    }
    else {
      updateForm(formToSave);
    }
  };

  const sendFormHandler = () => {
    if (confirm("Are you sure you want to send this form?")) {
      finalizeForm(idForm);
    }
  }

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
    getFormId();
  }, [searchParams]);

  useEffect(() => {
    loadFormHandler();
    console.log("idForm", idForm);
  }, [idForm]);

  useEffect(() => {
    loadCourseOptions();
  }, [loadedFormTitle]);

  return {
    idForm,
    formTitle,
    fields,
    userRole,
    isCreatingForm,
    courseOptions,
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
