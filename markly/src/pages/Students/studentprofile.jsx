import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import StudentModal from "../../components/studentModal.jsx";
import axios from "axios";

export default function StudentProfile() {
  const [modal, setModal] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        const res = await axios.get(
          "https://markly.onrender.com/api/auth/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStudentData(res.data || []);
      } catch (err) {
        console.error(
          "Error fetching students:",
          err.response?.data || err.message
        );
        setStudentData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleUpdateStudent = async (updatedStudent) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.put(
        `https://markly.onrender.com/api/students/${updatedStudent._id}`,
        updatedStudent,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStudentData((prev) =>
        prev.map((student) =>
          student._id === updatedStudent._id
            ? { ...student, ...updatedStudent }
            : student
        )
      );
    } catch (err) {
      console.error(
        "Error updating student:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} isTeacher={false} />

      <main className="container mx-auto p-6 mt-24">
        <h1 className="text-3xl font-bold mb-6">Student Profiles</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading students...</p>
        ) : studentData.length === 0 ? (
          <p className="text-center text-gray-600">
            No student profiles available.
          </p>
        ) : (
          <div className="space-y-8">
            {studentData.map((student) => (
              <div
                key={student._id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                {/* Personal Profile */}
                <section className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Personal Profile
                  </h2>
                  <p className="text-gray-600">Name: {student.name}</p>
                  <p className="text-gray-600">Email: {student.email}</p>
                  <p className="text-gray-600">Age: {student.age}</p>
                  <p className="text-gray-600">Address: {student.address}</p>
                  <p className="text-gray-600">Phone: {student.phone}</p>
                </section>

                {/* Academic Profile */}
                <section className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Academic Profile
                  </h2>
                  <p className="text-gray-600">Section: {student.section}</p>
                  <p className="text-gray-600">
                    Student Number: {student.studentNumber}
                  </p>
                  <p className="text-gray-600">
                    Clubs: {student.clubs?.join(", ") || "N/A"}
                  </p>
                </section>

                {/* Guardian Information */}
                <section>
                  <h2 className="text-xl font-semibold mb-2">
                    Guardian Information
                  </h2>
                  <p className="text-gray-600">Name: {student.guardianName}</p>
                  <p className="text-gray-600">
                    Email: {student.guardianEmail}
                  </p>
                  <p className="text-gray-600">
                    Phone: {student.guardianPhone}
                  </p>
                </section>
              </div>
            ))}
          </div>
        )}

        <StudentModal
          isOpen={modal}
          onClose={() => setModal(false)}
          student={studentData}
          onSave={handleUpdateStudent}
        />
      </main>
    </div>
  );
}
