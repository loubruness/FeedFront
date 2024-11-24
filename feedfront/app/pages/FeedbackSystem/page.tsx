"use client";

import React, { use, useState, useEffect } from "react";
import { Field, FormWithFields, Answer } from "@/types";
import { loadForm, saveForm, submitAnswer } from "@/api/feedbackSystem";
const FeedbackForm = () => {
  const courseOptions = ["Default","Advanced Programming", "Mathematics", "Software Architecture and Design", "English"];
  const [idForm, setIdForm] = useState(12);
  const [formTitle, setFormTitle] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [userRole, setUserRole] = useState("admin");
  const rating = ["Strongly Disagree", "Disagree", "No Opinion", "Agree", "Strongly Agree"];

  const handleSaveForm = () => {
    const fromSaved: FormWithFields = {
      id_form: idForm,
      course_name: formTitle,
      fields: fields,
    };
    console.log("Form Saved:", JSON.stringify(fromSaved));
    saveForm(fromSaved);
  };

  const handleSendForm = () => {
    console.log("Form Saved:", { formTitle, questions: fields });
    alert("Form Sent Successfully!");
  };
  const handleLoadForm = () => {
    loadForm(idForm).then((data) => {
      setFormTitle(data.course_name);
      setFields(data.fields);
    });
  };

  const handleSubmitAnswer = () => {
    const scores = fields.map((q) => {
      const score = (document.querySelector(`input[name="q${q.id_field}"]:checked`) as HTMLInputElement)?.value || null;
      return { id: q.id_field, score };
    });

    const allAnswered = scores.every((s) => s.score !== null);
    console.log("All Answered:", allAnswered);
    console.log("Scores:", scores);

    if (!allAnswered) {
      alert("Please answer all the questions before submitting the form.");
      return;
    }

    const answer: Answer = {
      id_form: idForm,
      grades: scores.map((s) => ({
        id_field: s.id,
        grade: parseInt(s.score || "3"),
      })),
    };

    submitAnswer(answer);
    
  };

  const updateField = (id: number, key: string, value: string) => {
    if (userRole === "admin") {
      setFields((prev) =>
        prev.map((q) => (q.id_field === id ? { ...q, [key]: value } : q))
      );
    }
  };

  const addField = () => {
    if (userRole === "admin") {
      const newId = fields.length ? fields[fields.length - 1].id_field + 1 : 1;
      setFields([
        ...fields,
        { id_field: newId, title: `Question ${newId}`, question: "Enter your question here..." },
      ]);
    }
  };

  const deleteQuestion = (id: number) => {
    if (userRole === "admin") {
      setFields((prev) => prev.filter((q) => q.id_field !== id));
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlIdForm = parseInt(urlParams.get("idForm") || "1");
    setIdForm(urlIdForm);
  }, []);

  useEffect(() => {
    handleLoadForm();
  }, [idForm]);

  return (
    <div className="min-h-screen bg-blue-900 text-gray-900 flex justify-center items-center px-16 py-8">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-lg p-10 shadow-[0_0px_64px_-12px_rgba(240,249,255,1)]">
        {/* Role Toggle */}
        <div className="mb-6 flex justify-end">
          <label className="mr-4 font-bold text-gray-700">Switch Role:</label>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>

        {userRole === "admin" ? (
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-400 text-transparent bg-clip-text">
              Create a Survey
            </h1>
          </div>) : (
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-400 text-transparent bg-clip-text">
              Give Feedback
            </h1>
          </div>)}

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-8">

          {userRole === "admin" ? (
            <div className="m-6">
              <label htmlFor="formTitle" className="leading-none px-2 inline-block text-lg text-blue-500 tracking-wide font-medium bg-white transform translate-y-1/2">
                Concerned course:
              </label>
              <select
                id="formTitle"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="text-lg w-full px-4 py-4 rounded-lg bg-gray-100 border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {courseOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="ml-8 text-center uppercase text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-200 text-transparent bg-clip-text">{formTitle}</p>
          )}


          {fields.map((field) => (
            <div key={field.id_field} className="col-span-2 m-6 mt-4">
              <div className="mb-2">
                {userRole === "admin" ? (
                  <div className="">
                    <label htmlFor="formTitle" className="leading-none px-2 inline-block text-blue-500 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={field.title}
                      onChange={(e) => updateField(field.id_field, "title", e.target.value)}
                      className="text-base font-medium text-gray-700 px-4 py-4 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                  </div>
                ) : (
                  <div className="my-12 border-b text-center">
                    <div className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      {field.title}
                    </div>
                  </div>
                )}
              </div>
              <div>
                {userRole === "admin" ? (
                  <div className="mt-6">
                    <label htmlFor="formTitle" className="leading-none px-2 inline-block text-lg text-blue-500 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Question
                    </label>
                    <input
                      type="text"
                      value={field.question}
                      onChange={(e) => updateField(field.id_field, "question", e.target.value)}
                      className="text-lg w-full px-4 py-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ) : (
                  <p className="text-xl text-gray-700 text-center font-medium m-20">{field.question} *</p>
                )}
              </div>
              {userRole === "student" && (
                <div className="grid grid-cols-5 gap-2 rounded-xl bg-gray-50 p-2 mt-10 mb-10">
                  {[...Array(5)].map((_, num) => (
                    <div key={num + 1}>
                      <input type="radio" id={`q${field.id_field}n${num}`} name={`q${field.id_field}`} value={num + 1} className="peer hidden" />
                      <label htmlFor={`q${field.id_field}n${num}`} className="flex justify-center items-center cursor-pointer select-none rounded-xl p-2 peer-checked:bg-gradient-to-tl from-blue-500 to-indigo-500 peer-checked:font-bold peer-checked:text-white">
                        {rating[num]}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {userRole === "admin" && (
                <button
                  onClick={() => deleteQuestion(field.id_field)}
                  className="mt-4 px-3 py-1 text-sm font-semibold border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-600 focus:outline-none hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {userRole === "admin" && (
          <div className="mt-8 text-center">
            <button
              onClick={addField}
              className="px-4 py-3 rounded-lg font-semibold text-indigo-500 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white hover:from-blue-600 hover:to-indigo-600"
            >
              <div className="flex justify-evenly align-center text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                Add Question</div>
            </button>
          </div>
        )}

        <div className="flex justify-evenly mt-20">
          {userRole === "admin" ? (
            <>
              <button
                onClick={handleSaveForm}
                className="px-6 py-3 flex rounded-lg font-semibold text-xl bg-gradient-to-bl from-blue-500 to-teal-500 text-white hover:from-teal-400 hover:to-blue-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>

                Save
              </button>
              <button
                onClick={handleSendForm}
                className="px-6 py-3 flex rounded-lg font-semibold text-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-indigo-400 hover:to-blue-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
                Send
              </button>
            </>
          ) : (
            <button
              onClick={handleSubmitAnswer}
              className="px-6 py-3 rounded-lg font-semibold text-xl  bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-indigo-400 hover:to-blue-400"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;

