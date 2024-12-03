import { FormWithFields, Answer } from "@/types";

const host = process.env.API_HOST;

const getToken = () => localStorage.getItem("token");

type ApiFetchOptions = {
  method?: string; 
  headers?: Record<string, string>;
  body?: string;
};

const apiFetch = async (endpoint: string, options: ApiFetchOptions = {}) => {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` }),
  };

  const response = await fetch(`${host}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    console.error(errorMessage);
    throw new Error(`Request failed! Status: ${response.status}, Message: ${errorMessage}`);
  }
  return response.json();
};


export const createForm = async (form: FormWithFields): Promise<FormWithFields> => {
  return await apiFetch("/forms/create", {
    method: "POST",
    body: JSON.stringify(form),
  });
};

export const updateForm = async (form: FormWithFields) => {
  return await apiFetch(`/forms/update/${form.id_form}`, {
    method: "PUT",
    body: JSON.stringify(form),
  });
};

export const finalizeForm = async (id_form: number) => {
  return await apiFetch(`/forms/finalize/${id_form}`, {
    method: "PUT"
  });
};

export const loadForm = async (id: number): Promise<FormWithFields> => {
  console.log("loadForm", id);
  return await apiFetch(`/forms/${id}`);
};

export const submitAnswer = async (response: Answer) => {
  return await apiFetch("/responses/", {
    method: "POST",
    body: JSON.stringify(response),
  });
};

export const getCourseOptions = async (): Promise<string[]> => {
  return await apiFetch("/forms/coursesWithoutForm");
};

export const getForms = async () => {
  return await apiFetch("/forms");
};

export const deleteForm = async (id_form: number) => {
  return await apiFetch(`/forms/delete/${id_form}`, {
    method: "DELETE",
  });
}