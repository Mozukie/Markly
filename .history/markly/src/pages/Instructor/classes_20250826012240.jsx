import React from "react";
import Header from "../../components/Header.jsx";
import axios from "axios";
import { useEffect } from "react";

export default function Classes() {
    const [modal, setModal] = React.useState(false);
    const [classList, setClassList] = React.useState([]);   

    useEffect(() => {
        const fetchClasses = async () => {
            try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/classes", {
                headers: { Authorization: `Bearer ${token}` }
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
  try {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const res = await axios.post("http://localhost:5000/api/classes", {
      classSubject: e.target.classSubject.value,
      classCode: e.target.classCode.value,
      classSection: e.target.classSection.value,
      classDay: e.target.classDay.value,
      classTime: e.target.classTime.value,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Class Added:", res.data);
    alert("Class added successfully!");
    setModal(false);

    // Refresh class list
    const updated = await axios.get("http://localhost:5000/api/classes", {
      headers: { Authorization: `Bearer ${token}` }
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
    await axios.delete(`http://localhost:5000/api/classes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Refresh class list
    const updated = await axios.get("http://localhost:5000/api/classes", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setClassList(updated.data);
  } catch (err) {
    console.error("Error deleting class:", err.response?.data || err.message);
  }
};




    const toggleModal = () => {
        setModal(!modal);
    }
    return (
        <div>
            <Header isLoggedIn={true} isTeacher={true}/>
            <main className="container mx-auto p-4">
                <div
                className="bg-white p-6 rounded-lg shadow-lg"
                style={{ minHeight: '70vh' }}
                >
                <h1 className="text-2xl font-bold mb-4">Classes</h1>
                <button onClick={toggleModal} className="bg-[#43699c] text-white px-4 py-2 rounded hover:bg-[#43699c] transition-colors">
                    Add Class
                </button>
                {modal && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Add New Class</h2>
                        <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <label htmlFor="classSubject" className="block text-gray-700">Class Subject</label>
                            <input type="text" id="classSubject" name="classSubject" className="w-full px-3 py-2 border rounded" value={} required />
                        </div>
                        <div>
                            <label htmlFor="classCode" className="block text-gray-700">Class Code</label>
                            <input type="text" id="classCode" name="classCode" className="w-full px-3 py-2 border rounded" required />
                        </div>
                        <div>
                            <label htmlFor="classSection" className="block text-gray-700">Class Section</label>
                            <input type="text" id="classSection" name="classSection" className="w-full px-3 py-2 border rounded" required />
                        </div>
                        <div>
                            <label htmlFor="day" className="block text-gray-700">Day</label>
                            <input type="date" id="classDay" name="day" className="w-full px-3 py-2 border rounded" required />
                        </div>
                        <div>
                            <time htmlFor="classTime" className="block text-gray-700">Class Time</time>
                            <input type="time" id="classTime" name="classTime" className="w-full px-3 py-2 border rounded" required />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={toggleModal}>Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-[#43699c] text-white rounded hover:bg-[#365f8a]">Save</button>
                        </div>
                        </form>
                    </div>
                    </div>
                )}
                <div>
            </div>
        </div>

        <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Saved Classes</h2>
        {classList.length === 0 ? (
            <p className="text-gray-600">No classes saved yet.</p>
        ) : (
            <ul className="space-y-3">
                {classList.map((cls) => (
                    <li key={cls._id} className="border p-4 rounded shadow-sm relative">
                    <p><strong>Subject:</strong> {cls.classSubject}</p>
                    <p><strong>Code:</strong> {cls.classCode}</p>
                    <p><strong>Section:</strong> {cls.classSection}</p>
                    <p><strong>Day:</strong> {cls.classDay}</p>
                    <p><strong>Time:</strong> {cls.classTime}</p>
                    <button
                        onClick={() => handleDelete(cls._id)}
                        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    >
                        🗑 Delete
                    </button>
                    </li>
                ))}
                </ul>

        )}
        </div>

            </main>
        </div>
    );
}