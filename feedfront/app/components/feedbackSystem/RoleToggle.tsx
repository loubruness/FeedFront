import React from "react";

interface RoleToggleProps {
    userRole: string;
    setUserRole: (role: string) => void;
}

const RoleToggle: React.FC<RoleToggleProps> = ({ userRole, setUserRole }) => {
    return (
        <div className="mb-6 flex justify-end items-center">
            <label className="mr-4 font-bold text-gray-700">Switch Role:</label>
            <select value={userRole} onChange={(e) => setUserRole(e.target.value)}  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                
            </select>
        </div>
    );
};

export default RoleToggle;
