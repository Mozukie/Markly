import React, { useEffect, useState } from "react";

export default function TeacherModal({ isOpen, onClose, teacher, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    address: "",
    subjects: [""],
    expertise: [""],
    yearsOfExperience: 0,
    bio: "",
    department: "",
    employeeId: "",
  });

  useEffect(() => {
    if (teacher) {
      setFormData({
        ...teacher,
        subjects: teacher.subjects.length ? teacher.subjects : [""],
        expertise: teacher.expertise.length ? teacher.expertise : [""],
      });
    }
  }, [teacher]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updatedArray }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: updatedArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Teacher Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-3">

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
            name="phone"
            value={formData.phone}
            placeholder="Phone"
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

          {/* Subjects */}
          <div>
            <label className="font-semibold">Subjects:</label>
            {formData.subjects.map((sub, i) => (
              <div key={i} className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={sub}
                  onChange={(e) => handleArrayChange("subjects", i, e.target.value)}
                  placeholder={`Subject ${i + 1}`}
                  className="w-full border p-2 rounded"
                />
                <button type="button" onClick={() => removeArrayItem("subjects", i)} className="text-red-500">&times;</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("subjects")} className="text-blue-500 mt-2">+ Add Subject</button>
          </div>

          {/* Expertise */}
          <div>
            <label className="font-semibold">Expertise:</label>
            {formData.expertise.map((exp, i) => (
              <div key={i} className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={exp}
                  onChange={(e) => handleArrayChange("expertise", i, e.target.value)}
                  placeholder={`Expertise ${i + 1}`}
                  className="w-full border p-2 rounded"
                />
                <button type="button" onClick={() => removeArrayItem("expertise", i)} className="text-red-500">&times;</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("expertise")} className="text-blue-500 mt-2">+ Add Expertise</button>
          </div>

          <input
            type="number"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            placeholder="Years of Experience"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="department"
            value={formData.department}
            placeholder="Department"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            placeholder="Employee ID"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="bio"
            value={formData.bio}
            placeholder="Bio"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
