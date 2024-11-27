"use client";

import React from "react";
import FeedbackForm from "@/components/feedbackSystem/FeedbackForm";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-900 text-gray-900 flex justify-center items-baseline px-16 py-8">
      <Link href="Dashboard">
        <button className="xl:mr-[12px] xl:-ml-[39px] sm:mr-0 sm:ml-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-10 h-10 text-inherit"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
      </Link>
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-lg p-10 shadow-[0_0px_64px_-12px_rgba(240,249,255,1)]">
        <FeedbackForm />
      </div>
    </div>
  );
};

export default HomePage;

