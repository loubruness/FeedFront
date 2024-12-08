import { Answer, Field, FormWithFields } from "@/types";
import { createForm, finalizeForm, getCourseOptions, loadForm, submitAnswer, updateForm } from "@/api/feedbackSystem";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

import { getUserRole } from "@/utils/roleUtils";

export const useFeedbackForm = () => {
  const [idForm, setIdForm] = useState(1);
  const [formTitle, setFormTitle] = useState("");
  const [loadedFormTitle, setLoadedFormTitle] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);
  const [userRole, setUserRole] = useState("admin");
  const [selectedRole, setSelectedRole] = useState("admin");
  const [isCreatingForm, setIsCreatingForm] = useState(true);
  const [courseOptions, setCourseOptions] = useState<string[]>([]);
  const [formStatus, setFormStatus] = useState<string>("default");

  const router = useRouter();
  const searchParams = useSearchParams();

  const loadFormHandler = async (id: number) => {
    try {
      const encryptedRole = localStorage.getItem("encryptedRole") || "";
      const iv = localStorage.getItem("iv") || "";
      const role = getUserRole(encryptedRole, iv);
      setUserRole(role);
      setSelectedRole(role);
      const data = await loadForm(id);
      setLoadedFormTitle(data.course_name);
      setFormTitle(data.course_name);
      setFields(data.fields);
      setFormStatus(data.status || "draft");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert(`Failed to load the form ${id}. Redirecting to create page.`);
      setIdForm(1);
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

  const finalizeFormHandler = () => {
    if (confirm("Are you sure you want to send this form?")) {
      finalizeForm(idForm);
      setFormStatus("finalized");
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

    console.log(searchParams.get("token"));
    const token = searchParams.get("token");

    const answer: Answer = {
      id_form: idForm,
      grades: scores.map((s) => ({ id_field: s.id, grade: parseInt(s.score || "3") })),
      token : token || "",
    };
    submitAnswer(answer);
    router.push("/pages/FeedbackSystemOutro");
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
        { id_field: newId, title: `Question ${newId}`, question: "Enter your question here...", editable: true },
      ]);
    }
  };

  const deleteFieldHandler = (id: number) => {
    if (userRole === "admin") {
      setFields((prev) => prev.filter((field) => field.id_field !== id));
    }
  };

  useEffect(() => {
    const urlId = searchParams.get("idForm");
    if (urlId) {
      setIdForm(parseInt(urlId));
      setIsCreatingForm(false);
      loadFormHandler(parseInt(urlId));
    } else {
      setIsCreatingForm(true);
      loadFormHandler(idForm);
    }
  }, [searchParams]);


  useEffect(() => {
    loadCourseOptions();
  }, [loadedFormTitle]);

  return {
    idForm,
    formTitle,
    formStatus,
    fields,
    userRole,
    selectedRole,
    isCreatingForm,
    courseOptions,
    setSelectedRole,
    setFormTitle,
    addFieldHandler,
    updateFieldHandler,
    deleteFieldHandler,
    saveFormHandler,
    finalizeFormHandler,
    submitAnswerHandler,
    setIdForm,
  };
};
