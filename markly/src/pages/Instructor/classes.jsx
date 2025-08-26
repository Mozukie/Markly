import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import axios from "axios";
import AddClassModal from "../../components/addClassModal.jsx";
import QRCodeModal from "../../components/QRCodeModal.jsx";

export default function Classes() {
  const [modal, setModal] = useState(false);
  const [classData, setClassData] = useState({
    subject: "",
    code: "",
    section: "",
    days: [],
    time: "",
  });
  const [classList, setClassList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [qrModal, setQrModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [expiryDuration, setExpiryDuration] = useState("300");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        const res = await axios.get("https://markly.onrender.com/api/classes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClassList(res.data);
      } catch (err) {
        console.error("Error fetching classes:", err.response?.data || err.message);
      }
    };

    fetchClasses();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    const payload = {
      classSubject: classData.subject,
      classCode: classData.code,
      classSection: classData.section,
      classDays: classData.days || [],
      classTime: classData.time,
    };

    try {
      if (isEditing) {
        await axios.put(`https://markly.onrender.com/api/classes/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Class updated successfully!");
      } else {
        await axios.post("https://markly.onrender.com/api/classes", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Class added successfully!");
      }

      setModal(false);
      setIsEditing(false);
      setEditId(null);

      const updated = await axios.get("https://markly.onrender.com/api/classes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClassList(updated.data);
    } catch (err) {
      console.error("Error saving class:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.delete(`https://markly.onrender.com/api/classes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = await axios.get("https://markly.onrender.com/api/classes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClassList(updated.data);
    } catch (err) {
      console.error("Error deleting class:", err.response?.data || err.message);
    }
  };

  const handleEdit = (cls) => {
    setClassData({
      subject: cls.classSubject,
      code: cls.classCode,
      section: cls.classSection,
      days: cls.classDay || [],
      time: cls.classTime,
    });
    setEditId(cls._id);
    setIsEditing(true);
    setModal(true);
  };

  return (
    <div>
      <Header isLoggedIn={true} isTeacher={true} />
      <main className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg" style={{ minHeight: "70vh" }}>
          <h1 className="text-2xl font-bold mb-4">Classes</h1>
          <button
            onClick={() => setModal(true)}
            className="bg-[#43699c] text-white px-4 py-2 rounded hover:bg-[#365f8a]"
          >
            Add Class
          </button>

          {/* AddClassModal */}
          <AddClassModal
            isOpen={modal}
            onClose={() => setModal(false)}
            onSave={handleSave}
            classData={classData}
            setClassData={setClassData}
            isEditing={isEditing}
          />

          {/* QRCodeModal */}
          <QRCodeModal
            isOpen={qrModal}
            onClose={() => {
              setQrModal(false);
              setSelectedClass(null);
              setExpiryDuration("300");
            }}
            selectedClass={selectedClass}
            expiryDuration={expiryDuration}
            setExpiryDuration={setExpiryDuration}
          />

          {/* Class List */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Saved Classes</h2>
            {classList.length === 0 ? (
              <p className="text-gray-600">No classes saved yet.</p>
            ) : (
              <ul className="space-y-3">
                {classList.map((cls) => (
                  <li
                    key={cls._id}
                    className="border p-4 rounded shadow-sm relative"
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
                      <strong>Day:</strong> {cls.classDay}
                    </p>
                    <p>
                      <strong>Time:</strong> {cls.classTime}
                    </p>

                    <div className="absolute top-4 right-4 space-x-2">
                      <button
                        onClick={() => handleEdit(cls)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cls._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setSelectedClass(cls);
                          setQrModal(true);
                        }}
                        className="text-green-500 hover:underline"
                      >
                        Generate QR
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
