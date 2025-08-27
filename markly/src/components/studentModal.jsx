import React, { useState, useEffect } from "react";

export default function StudentModal({ isOpen, onClose, student, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    phone: "",
    class: "",
    section: "",
    studentNumber: "",
    clubs: [""],
    guardianName: "",
    guardianEmail: "",
    guardianPhone: "",
  });

  // Preload student data into form when modal opens
  useEffect(() => {
    if (student) {
      setFormData({
        ...student,
        clubs: student.clubs?.length ? student.clubs : [""],
      });
    }
  }, [student]);

  if (!isOpen) return null;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle club input changes
  const handleClubChange = (index, value) => {
    const updatedClubs = [...formData.clubs];
    updatedClubs[index] = value;
    setFormData((prev) => ({ ...prev, clubs: updatedClubs }));
  };

  // Add another club field
  const addClub = () => {
    setFormData((prev) => ({ ...prev, clubs: [...prev.clubs, ""] }));
  };

  // Remove a club field
  const removeClub = (index) => {
    const updatedClubs = formData.clubs.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, clubs: updatedClubs }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // send updated data back to parent
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Student Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Personal Info */}
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            placeholder="Age"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            placeholder="Address"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="Phone"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Academic Info */}
          <input
            type="text"
            name="class"
            value={formData.class}
            placeholder="Class"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="section"
            value={formData.section}
            placeholder="Section"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="studentNumber"
            value={formData.studentNumber}
            placeholder="Student Number"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Clubs (multiple inputs) */}
          <div>
            <label className="font-semibold">Clubs:</label>
            {formData.clubs.map((club, index) => (
              <div key={index} className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={club}
                  onChange={(e) => handleClubChange(index, e.target.value)}
                  placeholder={`Club ${index + 1}`}
                  className="w-full border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeClub(index)}
                  className="text-red-500"
                >
                    &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addClub}
              className="text-blue-500 mt-2"
            >
              + Add Club
            </button>
          </div>

          {/* Guardian Info */}
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            placeholder="Guardian Name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="guardianEmail"
            value={formData.guardianEmail}
            placeholder="Guardian Email"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="guardianPhone"
            value={formData.guardianPhone}
            placeholder="Guardian Phone"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
