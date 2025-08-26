import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";

export default function StudentDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div>
      <Header isLoggedIn={true} isTeacher={user.role === "Teacher"} />
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
