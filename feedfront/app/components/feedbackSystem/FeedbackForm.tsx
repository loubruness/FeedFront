import React from "react";
import { useFeedbackForm } from "@/hooks/useFeedbackForm";
import RoleToggle from "./RoleToggle";
import AdminFields from "./AdminFeedback";
import StudentFields from "./StudentFeedBack";

const FeedbackForm = () => {
    const {
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
    } = useFeedbackForm();

    return (
        <div>
            {/* Role Toggle */}
            <RoleToggle userRole={userRole} setUserRole={setUserRole} />

            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-400 text-transparent bg-clip-text">
                    {userRole === "admin" ? isCreatingForm ? "Create Survey" : "Update Survey" : "Give Feedback"}
                </h1>
            </div>
            {userRole === "admin" ? (
                <AdminFields
                    fields={fields}
                    updateFieldHandler={updateFieldHandler}
                    deleteFieldHandler={deleteFieldHandler}
                    addFieldHandler={addFieldHandler}
                    setFormTitle={setFormTitle}
                    courseOptions={courseOptions}
                    formTitle={formTitle}
                />
            ) : (
                <StudentFields fields={fields} formTitle={formTitle} submitAnswerHandler={submitAnswerHandler} />
            )}

            <div className="flex justify-evenly mt-20">
                {userRole === "admin" ? (
                    <>
                        <button
                            onClick={saveFormHandler}
                            className="px-6 py-3 flex rounded-lg font-semibold text-xl bg-gradient-to-bl from-blue-500 to-teal-500 text-white hover:from-teal-400 hover:to-blue-400"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 mr-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                            </svg>

                            Save
                        </button>
                        <button
                            onClick={sendFormHandler}
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
                        onClick={submitAnswerHandler}
                        className="px-6 py-3 rounded-lg font-semibold text-xl  bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-indigo-400 hover:to-blue-400"
                    >
                        Submit
                    </button>
                )}
            </div>
            {/* <button onClick={userRole === "admin" ? saveFormHandler : submitAnswerHandler}>
                {userRole === "admin" ? "Save Form" : "Submit Feedback"}
            </button> */}
        </div>
    );
};

export default FeedbackForm;
