import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ClassAttendance() {
  const { classId } = useParams(); // e.g., /attendance/:classId
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const res = await axios.get(`http://https://markly.onrender.com:5000/api/attendance/${classId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching attendance:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [classId]);

  return (
    <>
      <Header isLoggedIn={true} isTeacher={true} />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Class Attendance</h1>
        {loading ? (
          <p>Loading attendance...</p>
        ) : students.length === 0 ? (
          <p>No students have scanned the QR code yet.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Student Number</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Time Scanned</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td className="p-2 border">{s.studentNumber}</td>
                  <td className="p-2 border">{s.firstname} {s.lastname}</td>
                  <td className="p-2 border">{new Date(s.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
