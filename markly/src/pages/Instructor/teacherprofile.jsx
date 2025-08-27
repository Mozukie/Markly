import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header.jsx";
import TeacherModal from "../../components/teacherModal.jsx";

export default function TeacherProfile() {
  const [teacher, setTeacher] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch current teacher info
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const res = await axios.get("https://markly.onrender.com/api/teachers/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeacher(res.data);
      } catch (err) {
        console.error("Error fetching teacher:", err.response?.data || err.message);
      }
    };

    fetchTeacher();
  }, []);

  // Update teacher info
  const handleUpdateTeacher = async (updatedData) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.put(`https://markly.onrender.com/api/teachers/${teacher._id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeacher(res.data);
      setModalOpen(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating teacher:", err.response?.data || err.message);
      alert("Failed to update profile.");
    }
  };

  if (!teacher) return <p>Loading...</p>;

  return (
    <>
      <Header isLoggedIn={true} isTeacher={true} />
      <main className="container mx-auto p-6 mt-24">
        <h1 className="text-3xl font-bold mb-6">Teacher Profile</h1>

        {/* Personal Info */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
          <p><strong>Name:</strong> {teacher.name}</p>
          <p><strong>Email:</strong> {teacher.email}</p>
          <p><strong>Age:</strong> {teacher.age}</p>
          <p><strong>Phone:</strong> {teacher.phone}</p>
          <p><strong>Address:</strong> {teacher.address}</p>
        </section>

        {/* Professional Info */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Professional Information</h2>
          <p><strong>Subjects:</strong> {teacher.subjects.join(", ")}</p>
          <p><strong>Expertise:</strong> {teacher.expertise.join(", ")}</p>
          <p><strong>Years of Experience:</strong> {teacher.yearsOfExperience}</p>
          <p><strong>Bio:</strong> {teacher.bio}</p>
          <p><strong>Department:</strong> {teacher.department}</p>
          <p><strong>Employee ID:</strong> {teacher.employeeId}</p>
        </section>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >
          Edit Profile
        </button>

        {/* Edit Modal */}
        <TeacherModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          teacher={teacher}
          onSave={handleUpdateTeacher}
        />
      </main>
    </>
  );
}
