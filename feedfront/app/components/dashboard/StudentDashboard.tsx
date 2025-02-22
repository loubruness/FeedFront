"use client";
import React from "react";
import SharedWidget from "./SharedDashboard"; // Importing the SharedWidget component
import Link from "next/link"; // Importing Next.js Link for navigation
import { useDashboard } from "@/hooks/useDashboard";

const StudentDashboard = () => {
  const {
    forms,
  } = useDashboard();
  return (
    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
      {/* Main container: Responsive grid layout with one column by default, three columns for XL screens */}

      {/* Dashboard Card */}
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-3">
        {/* Wrapper for the entire dashboard card, spanning all three columns on larger screens */}

        {/* Header Section */}
        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
          <SharedWidget /> {/* Shared widget displayed in the dashboard header */}
        </div>

        {/* Current Surveys Table */}
        <div className="p-6 pt-0 pb-2 mt-5">
          <table className="w-full min-w-[640px] table-auto max-h-[1050px]">
            {/* Table structure for listing current surveys */}
            <thead className="bg-gradient-to-l from-sky-300 to-indigo-400">
              {/* Table header with gradient background */}
              <tr>
                {/* Header cell for survey names */}
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left rounded-tl-xl">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Current Surveys</p>
                </th>
                {/* Header cell for end dates */}
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">End Date</p>
                </th>
                {/* Header cell for the launch button */}
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left rounded-tr-xl">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Launch</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Example row for a current survey */}
              {forms.map((form) => ((form.status == "current") &&
                <tr key={form.id_form}>
                  {/* Cell for the survey name */}
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div className="gap-4 w-10/12">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">{form.course_name}</p>
                    </div>
                  </td>
                  {/* Cell for the survey end date */}
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div className="w-10/12">
                      <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{new Date(form.end_date).toLocaleDateString()}</p>
                    </div>
                  </td>
                  {/* Cell for the launch button */}
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Link href={`./FeedbackSystemIntro?idForm=${form.id_form}`}>
                      {/* Button with an SVG icon to launch the survey */}
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6 hover:text-green-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                          />
                        </svg>
                      </button>
                    </Link>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>

        {/* Past Surveys Table */}
        <div className="p-6 pt-0 pb-2 mt-20">
          {/* Similar table structure for past surveys */}
          <table className="w-full min-w-[640px] table-auto max-h-[1050px]">
            <thead className="bg-gradient-to-l from-sky-300 to-indigo-400">
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left rounded-tl-xl">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Past Surveys</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">End Date</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Example row for a past survey */}
              {forms.map((form) => ((form.status == "past") &&
                <tr key={form.id_form}>
                  {/* Cell for the survey name */}
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div className="gap-4 w-10/12">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">{form.course_name}</p>
                    </div>
                  </td>
                  {/* Cell for the survey end date */}
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div className="w-10/12">
                      <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{new Date(form.end_date).toLocaleDateString()}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
