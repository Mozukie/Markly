import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";



export default function NewProfile() {
    const [role, setRole] = useState("Student");
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Gather data
  const profileData = {
    role,
    section: document.getElementById("section").value,
    studentNumber: role === "Student" ? document.getElementById("studentNumber")?.value : undefined,
    subjects: role === "Teacher" ? document.getElementById("subjects")?.value.split(",") : [],
  };

  try {
const token = localStorage.getItem("token");

const res = await fetch("http://localhost:5000/api/auth/profile", {
  method: "PUT",  // make sure this is PUT
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // must be Bearer + token
  },
  body: JSON.stringify(profileData),
});


    if (!res.ok) throw new Error("Failed to save profile");

    alert("Profile saved!");
    role === "Student"
      ? navigate("/studentdashboard")
      : navigate("/teacherdashboard");
  } catch (err) {
    console.error(err);
    alert("Error saving profile. Make sure you are logged in.");
  }
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
                            <input type="text" id="firstname" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your first name" required/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" id="lastname" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your last name" required/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <select value={role} id="role" onChange={handleRoleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                                <option value="Student" id="student">Student</option>
                                <option value="Teacher" id="teacher">Teacher</option>
                            </select>
                        </div>
                        {role === "Teacher" && (
                            <div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Subject Expertise</label>
                                    <input type="text" id="subjects"className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Mathematics, Science" required/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Handling Sections</label>
                                    <input type="text" id="section" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Class 1, Class 2" required />
                                </div>
                            </div>
                        )}
                        {role === "Student" && (
                            <div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Section</label>
                                    <input type="text" id="section" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your section" required/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mt-2">Student Number</label>
                                    <input type="text" id="studentNumber" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your student number" required/>
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