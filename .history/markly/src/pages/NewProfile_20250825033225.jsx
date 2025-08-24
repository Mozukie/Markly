import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import { set } from "mongoose";


export default function NewProfile() {
    const [role, setRole] = useState("Student");
    const [Section, setSection] = useState("Class 1");

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        setSection(e.target.value === "Student" ? "Class 1" : "" );
    };
    return (
        <div>
            <Header isLoggedIn={true}/>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your first name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your last name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <select value={role} onChange={handleRoleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="Student">Student</option>
                                <option value="Teacher">Teacher</option>
                            </select>
                        </div>
                        {role === "Teacher" && (
                            <div>
                                <div>
                                <label className="block text-sm font-medium text-gray-700">Subject Expertise</label>
                                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Mathematics, Science" />
                                </div>
                                <div>
                                <label className="block text-sm font-medium text-gray-700">Handling Sections</label>
                                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Class 1, Class 2" />
                                </div>
                            </div>
                        )}
        </div>
    );
}