import React from "react";
import Header from "../../components/Header.jsx";
import axios from "axios";
import { useEffect , useState } from "react";
import QRCode from 'react-qr-code'

//  function getUpcomingDates(daysArray, startDate, endDate) {
//   const dayMap = {
//     Sunday: 0,
//     Monday: 1,
//     Tuesday: 2,
//     Wednesday: 3,
//     Thursday: 4,
//     Friday: 5,
//     Saturday: 6,
//   };

//   const result = [];
//   const current = new Date(startDate);

//   while (current <= new Date(endDate)) {
//     if (daysArray.includes(current.toLocaleDateString("en-US", { weekday: "long" }))) {
//       result.push(new Date(current));
//     }
//     current.setDate(current.getDate() + 1);
//   }

//   return result;
// }


//   const result = [];
//   const current = new Date(startDate);

//   while (current <= new Date(endDate)) {
//     if (daysArray.includes(current.toLocaleDateString("en-US", { weekday: "long" }))) {
//       result.push(new Date(current));
//     }
//     current.setDate(current.getDate() + 1);
//   }

//   return result;
// }


export default function Classes() {
    const [modal, setModal] = useState(false);
    const [classData, setClassData] = useState({ "subject": "", "code": "", "section": "", "day": "", "time": "" });
    const [classList, setClassList] = useState([]);   
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [qrModal, setQrModal] = React.useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [expiryDuration, setExpiryDuration] = useState("300");




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
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        const payload = {
            classSubject: classData.subject,
            classCode: classData.code,
            classSection: classData.section,
            classDay: classData.days, // array of weekdays
            classTime: classData.time,
        };

        try {
            if (isEditing) {
            await axios.put(`http://localhost:5000/api/classes/${editId}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Class updated successfully!");
            } else {
            await axios.post("http://localhost:5000/api/classes", payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Class added successfully!");
            }

            setModal(false);
            setIsEditing(false);
            setEditId(null);

            const updated = await axios.get("http://localhost:5000/api/classes", { headers: { Authorization: `Bearer ${token}` }});
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

        const handleEdit = (cls) => {
            setClassData({
                subject: cls.classSubject,
                code: cls.classCode,
                section: cls.classSection,
                day: cls.classDay,
                time: cls.classTime,
            });
            setEditId(cls._id);
            setIsEditing(true);
            setModal(true);
            };


        const toggleModal = () => {
            setModal(!modal);
            setIsEditing(false);
            setEditId(null);
            setClassData({ subject: "", code: "", section: "", day: "", time: "" });
            };

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
                            <input type="text" id="classSubject" name="classSubject" className="w-full px-3 py-2 border rounded" value={classData.subject} onChange={(e) => setClassData({ ...classData, subject: e.target.value })} required />
                        </div>
                        <div>
                            <label htmlFor="classCode" className="block text-gray-700">Class Code</label>
                            <input type="text" id="classCode" name="classCode" className="w-full px-3 py-2 border rounded" value={classData.code} onChange={(e) => setClassData({ ...classData, code: e.target.value })}  required />
                        </div>
                        <div>
                            <label htmlFor="classSection" className="block text-gray-700">Class Section</label>
                            <input type="text" id="classSection" name="classSection" className="w-full px-3 py-2 border rounded" value={classData.secti} onChange={(e) => setClassData({ ...classData, section: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Days</label>
                            <div className="grid grid-cols-2 gap-2">
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                <label id="classDay" key={day} className="flex items-center space-x-2">
                                    <input type="checkbox" value={day} checked={classData.days?.includes(day)} onChange={(e) => {const updatedDays = e.target.checked? [...(classData.days || []), day]: (classData.days || []).filter((d) => d !== day);  setClassData({ ...classData, days: updatedDays });}} />
                                    <span>{day}</span>
                                </label>
                                ))}
                            </div>
                            {classData.days?.length > 0 && (
                                <p className="text-sm text-gray-600 mt-2">
                                Selected days: <strong>{classData.days.join(", ")}</strong>
                                </p>
                            )}
                            </div>


                        <div>
                            <time htmlFor="classTime" className="block text-gray-700">Class Time</time>
                            <input type="time" id="classTime" name="classTime" className="w-full px-3 py-2 border rounded" value={classData.time} onChange={(e) => setClassData({ ...classData, time: e.target.value })} required />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={toggleModal}>Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-[#43699c] text-white rounded hover:bg-[#365f8a]">Save</button>
                        </div>
                        </form>
                    </div>
                    </div>
                )}

                {classData.days?.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                        Selected days: {classData.days.join(", ")}
                    </p>
                )}

                {qrModal && selectedClass && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-100">
                        <h2 className="text-xl font-bold mb-4">QR Code for {selectedClass.classSubject}</h2>
                        <label className="block mb-2 text-gray-700">Expiration Time</label>
                        <select className="w-full mb-4 px-3 py-2 border rounded" value={expiryDuration} onChange={(e) => setExpiryDuration(e.target.value)} >
                            <option value="300">5 minutes</option>
                            <option value="600">10 minutes</option>
                            <option value="1800">30 minutes</option>
                            <option value="3600">1 hour</option>
                            <option value="7200">2 hours</option>
                        </select>

                        < QRCode value={`http://localhost:5000/attendance/${selectedClass._id}?expires=${Date.now() + parseInt(expiryDuration) * 1000}`}size={300} className="mx-auto"/>
                        
                        <div className="flex justify-end mt-4">
                            <button onClick={() => { setQrModal(false); setSelectedClass(null); setExpiryDuration("300");}} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                            Close
                            </button>
                        </div>
                        </div>
                    </div>
                    )}

                <div>
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
                                <div className="absolute top-4 right-4 space-x-2">
                                    <button onClick={() => handleEdit(cls)} className="text-blue-500 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(cls._id)} className="text-red-500 hover:underline">Delete</button>
                                    <button onClick={() => {setSelectedClass(cls);setQrModal(true);}}className="text-green-500 hover:underline">Generate QR</button>
                                </div>
                                {cls.qrLink && (
                                    <div className="mt-2">
                                        <QRCode value={cls.qrLink} size={150} />
                                        <p className="text-sm text-gray-500 mt-1">Expires at: {new Date(Number(cls.qrLink.split("expires=")[1])).toLocaleString()}</p>
                                    </div>
                                    )}      
                                </li>
                            ))}
                    
                            </ul>

                    )}
                    </div>
                        </div>
                    </div>

                    

                        </main>
                    </div>
                );
            }