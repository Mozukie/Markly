import { useEffect, useState } from "react";
import React from "react";
import Header from "../../components/Header.jsx";
import StudentModal from "../../components/studentModal.jsx";
import axios from "axios";

export default function StudentProfile() {
    const [modal, setModal] = useState(false);
    const[studentData, setStudentData] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                const res = await axios.get("https://markly.onrender.com/api/students", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStudentData(res.data);
            } catch (err) {
                console.error("Error fetching students:", err.response?.data || err.message);
            }
        };

        fetchStudents();
    }, []);

    const handleUpdateStudent = async (updatedStudent) => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            await axios.put(`https://markly.onrender.com/api/students/${updatedStudent.id}`, updatedStudent, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setStudentData((prev) =>
                prev.map((student) =>
                student._id === updatedStudent._id ? { ...student, ...updatedStudent } : student
                )
            );
            } catch (err) {
            console.error("Error updating student:", err.response?.data || err.message);
            }
        };


return (
    <div>
    <Header isLoggedIn={true} isTeacher={false} />
    <main>
        <div className="flex justify-end p-4">
        <div className="container mx-auto p-4" style={{ marginTop: "100px" }}>
        <h1 className="text-2xl font-bold mb-4">Student Profiles</h1>
            {studentData.map((student) => (
                <div>
                    <div className="container mx-auto p-4">
                        <h2 className="text-xl font-semibold mb-2">Personal Profile</h2>
                        <p className="text-gray-600">Name: {student.name}</p>
                        <p className="text-gray-600">Email: {student.email}</p>
                        <p className="text-gray-600">Age: {student.age}</p>
                        <p className="text-gray-600">Address: {student.address}</p>
                        <p className="text-gray-600">Phone: {student.phone}</p>
                    </div>
                    <div className="container mx-auto p-4">
                        <h2 className="text-xl font-semibold mb-2">Academic Profile</h2>
                        <p className="text-gray-600">Section: {student.section}</p>
                        <p className="text-gray-600">Student Number: {student.studentNumber}</p>
                        <p className="text-gray-600">Clubs: {student.clubs.join(", ")}</p>
                    </div>
                    <div className="container mx-auto p-4">
                        <h2 className="text-xl font-semibold mb-2">Guardian Information</h2>
                        <p className="text-gray-600">Name: {student.guardianName}</p>
                        <p className="text-gray-600">Email: {student.guardianEmail}</p>
                        <p className="text-gray-600">Phone: {student.guardianPhone}</p>
                    </div>
                 </div>
                 
            ))}
            </div>

    </div>
    <div className="flex justify-end p-4">
        
    </div>
    <StudentModal
        isOpen={modal}
        onClose={() => setModal(false)}
        student={studentData}
        onSave={handleUpdateStudent}

        />
    </main>
    </div>
)
}