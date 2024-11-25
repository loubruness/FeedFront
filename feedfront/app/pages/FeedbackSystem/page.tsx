"use client";

import React from "react";
import FeedbackForm from "@/components/feedbackSystem/FeedbackForm";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-900 text-gray-900 flex justify-center items-center px-16 py-8">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-lg p-10 shadow-[0_0px_64px_-12px_rgba(240,249,255,1)]">
      <FeedbackForm />
    </div>
    </div>
  );
};

export default HomePage;

