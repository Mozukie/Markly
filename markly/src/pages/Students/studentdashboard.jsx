import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Check both storages
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // No token? Send back to login
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("https://markly.onrender.com/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ attach token
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Auth error:", err.message);
        // Token invalid/expired → clear storage + redirect
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        navigate("/login");
      }
    };

    fetchUser();
  }, [token, navigate]);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div>
      <Header isLoggedIn={true} isTeacher={false} />
      <main className="container mx-auto p-4">
        <div
          className="bg-white p-6 rounded-lg shadow-lg"
          style={{ minWidth: "300px", marginTop: "100px" }}
        >
          <h1 className="text-3xl font-bold mb-4 text-center">
            Student Dashboard
          </h1>
          <p className="text-gray-700 mb-2 text-center">
            Name: {user.firstname} {user.lastname}
          </p>
          <p className="text-gray-700 mb-2 text-center">
            Section: {user.section || "Not assigned"}
          </p>
          {user.studentNumber && (
            <p className="text-gray-700 mb-2 text-center">
              Student Number: {user.studentNumber}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
