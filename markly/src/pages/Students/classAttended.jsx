// src/pages/Student/ClassAttended.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header.jsx";

export default function ClassAttended() {
  const [attendedClasses, setAttendedClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendedClasses = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        const res = await axios.get(
          "https://markly.onrender.com/api/classes/attended",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAttendedClasses(res.data || []);
      } catch (err) {
        console.error(
          "Error fetching attended classes:",
          err.response?.data || err.message
        );
        setAttendedClasses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendedClasses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} isTeacher={false} />

      <main className="container mx-auto p-6 mt-24">
        <h1 className="text-3xl font-bold mb-6">Classes Attended</h1>

        {loading ? (
          <p className="text-center mt-10 text-gray-600">
            Loading attended classes...
          </p>
        ) : attendedClasses.length === 0 ? (
          <p className="text-center mt-10 text-gray-600">
            You haven't attended any classes yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {attendedClasses.map((cls) => (
              <li
                key={cls._id}
                className="border p-4 rounded-lg shadow-sm bg-white"
              >
                <p>
                  <strong>Subject:</strong> {cls.classSubject}
                </p>
                <p>
                  <strong>Code:</strong> {cls.classCode}
                </p>
                <p>
                  <strong>Section:</strong> {cls.classSection}
                </p>
                <p>
                  <strong>Teacher:</strong>{" "}
                  {cls.teacher?.name || "N/A"} (
                  {cls.teacher?.email || "N/A"})
                </p>
                <p>
                  <strong>Time Attended:</strong>{" "}
                  {cls.attendedAt
                    ? new Date(cls.attendedAt).toLocaleString()
                    : "N/A"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
