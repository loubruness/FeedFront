import { FormWithFields, Answer } from "@/types";

const host = process.env.API_HOST;

export const createForm = async (form: FormWithFields): Promise<FormWithFields> => {
  try {
    const response = await fetch(`${host}/forms/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Form Creation Failed! Status: ${response.status}, Message: ${errorMessage}`);
    }

    const data = await response.json();
    alert("Form Created Successfully!");
    return data;
  } catch (error) {
    console.error("Error creating form:", error);
    alert("An error occurred: ");
    throw error;
  }
};


export const updateForm = (form: FormWithFields) => {
  fetch(`${host}/forms/update`, {
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

export const getCourseOptions = async (): Promise<string[]> => {
  const response = await fetch(`${host}/forms/coursesWithoutForm`);
  const data = await response.json();
  return data;
}