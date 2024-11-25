import { FormWithFields, Answer } from "../types";
const host = process.env.API_HOST;
export const saveForm = (form: FormWithFields) => {
  fetch(`${host}/forms/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((res) => {
    if (res.ok) {
      alert("Form Saved Successfully!");
    } else {
      alert("Form Save Failed!");
    }
  });
}
export const loadForm = async (id: number): Promise<FormWithFields> => {
  const response = await fetch(`${host}/forms/${id}`);
  const data = await response.json();
  return data;
}
export const submitAnswer = async (response: Answer) => {
  fetch(`${host}/responses/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  }).then((res) => {
    if (res.ok) {
      alert("Response Submitted Successfully!");
    } else {
      alert("Response Submission Failed!");
    }
  });
}