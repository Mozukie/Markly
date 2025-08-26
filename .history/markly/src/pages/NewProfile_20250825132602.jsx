import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function NewProfile() {
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();

  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      role,
      section: document.getElementById("section")?.value || "",
      studentNumber: role === "Student" ? document.getElementById("studentNumber")?.value || "" : undefined,
      subjects: role === "Teacher" ? document.getElementById("subjects")?.value.split(",") : [],
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must login first");

      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save profile");
      }

      alert("Profile saved!");
      role === "Student" ? navigate("/studentdashboard") : navigate("/teacherdashboard");
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <Header isLoggedIn={true} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label>Role</label>
              <select value={role} onChange={handleRoleChange} className="w-full border p-2 rounded">
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>
            </div>

            {role === "Teacher" && (
              <>
                <div>
                  <label>Subjects</label>
                  <input type="text" id="subjects" placeholder="Math, Science" className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label>Sections</label>
                  <input type="text" id="section" placeholder="Class 1, Class 2" className="w-full border p-2 rounded" />
                </div>
              </>
            )}

            {role === "Student" && (
              <>
                <div>
                  <label>Section</label>
                  <input type="text" id="section" placeholder="Enter your section" className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label>Student Number</label>
                  <input type="text" id="studentNumber" placeholder="Enter your student number" className="w-full border p-2 rounded" />
                </div>
              </>
            )}

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-4">Save Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
}
