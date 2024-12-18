import React from "react";
import { Field } from "@/types";

interface AdminFieldsProps {
    fields: Field[];
    updateFieldHandler: (id: number, key: string, value: string) => void;
    deleteFieldHandler: (id: number) => void;
    addFieldHandler: () => void;
    setFormTitle: (title: string) => void;
    courseOptions: string[];
    formTitle: string;
    isEditable: boolean;
}

const AdminFields: React.FC<AdminFieldsProps> = ({
    fields,
    updateFieldHandler,
    deleteFieldHandler,
    addFieldHandler,
    setFormTitle,
    courseOptions,
    formTitle,
    isEditable
}) => {
    return (
        <div className="grid grid-cols-1 gap-8">
            <div className="m-6">
                <label htmlFor="formTitle" className="leading-none px-2 inline-block text-lg text-blue-500 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Concerned course:
                </label>
                <select
                    id="formTitle"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="text-lg w-full px-4 py-4 rounded-lg bg-gray-100 border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!isEditable}
                > {courseOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
                </select>
            </div>

            {fields.map((field) => (
                <div key={field.id_field} className="col-span-2 m-6 mt-4">
                    <div className="mb-2">
                        <div key={field.id_field}>
                            <label htmlFor="formTitle" className="leading-none px-2 inline-block text-blue-500 tracking-wide font-medium bg-white transform translate-y-1/2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={field.title}
                                onChange={(e) => updateFieldHandler(field.id_field, "title", e.target.value)}
                                className="text-base font-medium text-gray-700 px-4 py-4 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                disabled={!isEditable || field.editable === false}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mt-6">
                            <label htmlFor="formTitle" className="leading-none px-2 inline-block text-lg text-blue-500 tracking-wide font-medium bg-white transform translate-y-1/2">
                                Question
                            </label>
                            <input
                                type="text"
                                value={field.question}
                                onChange={(e) => updateFieldHandler(field.id_field, "question", e.target.value)}
                                className="text-lg w-full px-4 py-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={!isEditable || field.editable === false}
                            />
                        </div>
                    </div>
                    {isEditable && field.editable === true &&
                    <button onClick={() => deleteFieldHandler(field.id_field)} className="mt-4 px-3 py-1 text-sm font-semibold border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-600 focus:outline-none hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                }
                </div>
            ))}
            {isEditable  &&
            <div className="mt-8 text-center">
                <button onClick={addFieldHandler} className="px-4 py-3 rounded-lg font-semibold text-indigo-500 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white hover:from-blue-600 hover:to-indigo-600">
                    <div className="flex justify-evenly align-center text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        Add Question</div>
                </button>
            </div>
            }
        </div>
    );
};

export default AdminFields;
