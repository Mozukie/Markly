import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";



export default function NewProfile() {
    const [role, setRole] = useState("Student");
    const [Section, setSection] = useState("Class 1");
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        setSection(e.target.value === "Student" ? "Class 1" : "" );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile saved!");
        {role === "Student" ? navigate("/studentdashboard") : navigate("/teacherdashboard")}

    };
    return (
        <div>
            <Header isLoggedIn={true}/>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
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
                        {role === "Student" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Section</label>
                                <select value={Section} onChange={(e) => setSection(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                    <option value="Class 1">Class 1</option>
                                    <option value="Class 2">Class 2</option>
                                    <option value="Class 3">Class 3</option>
                                    <option value="Class 4">Class 4</option>
                                    <option value="Class 5">Class 5</option>
                                </select>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mt-2">Student Number</label>
                                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your student number" />
                                </div>
                          </div> )
                        }
                        <div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">Save Profile</button>
                        </div>
                    </form>    
                </div>
            </div>    
        </div>
    );
}