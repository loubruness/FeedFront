import React from "react";
import { Field } from "@/types";
import { rating } from "@/constants/feedback";

interface StudentFieldsProps {
    fields: Field[];
    submitAnswerHandler: () => void;
    formTitle: string;
}

const StudentFields: React.FC<StudentFieldsProps> = ({ fields, formTitle, }) => {
    return (
        <div className="grid grid-cols-1 gap-8">
            <p className="ml-8 text-center uppercase text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-200 text-transparent bg-clip-text">{formTitle}</p>
            {fields.map((field) => (
                <div key={field.id_field} className="col-span-2 m-6 mt-4">
                    <div className="mb-2">
                        <div className="my-12 border-b text-center">
                            <div className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                {field.title}
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-xl text-gray-700 text-center font-medium m-20">{field.question} *</p>
                    </div>
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

                </div>
            ))}
        </div>
    );
};

export default StudentFields;
