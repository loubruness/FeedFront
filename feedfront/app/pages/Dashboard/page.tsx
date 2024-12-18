"use client";

import React, { useEffect, useState } from "react";

import AdminDashboard from "../../components/dashboard/AdminDashboard";
import NavBar from "../../components/dashboard/NavBar";
import StudentDashboard from "../../components/dashboard/StudentDashboard";
import TeacherDashboard from "../../components/dashboard/TeacherDashboard";
import { getUserRole } from "../../utils/roleUtils";

// Dashboard component handles rendering different dashboards based on user roles
const Dashboard = () => {
  const [role, setRole] = useState<string>("");
  // Get the user role (e.g., admin, student, teacher) from utility function
  useEffect(() => {
    // Only run this code on the client
    const encryptedRole = localStorage.getItem("encryptedRole") || "";
    const iv = localStorage.getItem("iv") || "";
    try {
      const userRole = getUserRole(encryptedRole, iv);
      setRole(userRole);
    } catch (error) {
      console.error("Error decrypting role:", error);
    }
  }, []);
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-5% via-blue-300 via-30% to-cyan-50 to-95%">
      {/* Navigation bar at the top */}
      <NavBar />

      <div className="p-4 xl:ml-80">
        {/* Title section */}
        <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1 mb-10">
          <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
            <div className="capitalize">
              <div className="flex items-center ml-3">
                {/* Icon and Title for "Your Surveys" */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-inherit">
                  <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                  <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                </svg>
                <h6 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white ml-3">
                  Your Surveys
                </h6>
              </div>
            </div>
          </div>
        </nav>

        {/* Conditionally render the dashboard based on user role */}
        {role === "admin" && <AdminDashboard />}
        {role === "student" && <StudentDashboard />}
        {role === "teacher" && <TeacherDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;
