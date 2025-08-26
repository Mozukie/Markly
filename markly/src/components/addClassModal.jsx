// src/components/AddClassModal.jsx
import React from "react";

export default function AddClassModal({
  isOpen,
  isEditing,
  classData,
  setClassData,
  onSave,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4"> {isEditing ? "Edit Class" : "Add New Class"} </h2>
        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label htmlFor="classSubject" className="block text-gray-700"> Class Subject </label>
            <input type="text" id="classSubject" className="w-full px-3 py-2 border rounded" value={classData.subject} onChange={(e) => setClassData({ ...classData, subject: e.target.value }) } required />
          </div>
          <div>
            <label htmlFor="classCode" className="block text-gray-700"> Class Code </label>
            <input type="text" id="classCode" className="w-full px-3 py-2 border rounded" value={classData.code} onChange={(e) => setClassData({ ...classData, code: e.target.value }) } required />
          </div>
          <div>
            <label htmlFor="classSection" className="block text-gray-700">
              Class Section
            </label>
            <input type="text" id="classSection" className="w-full px-3 py-2 border rounded" value={classData.section} onChange={(e) => setClassData({ ...classData, section: e.target.value }) } required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Days</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input type="checkbox" value={day} checked={classData.days.includes(day)} onChange={(e) => { const updatedDays = e.target.checked ? [...classData.days, day] : classData.days.filter((d) => d !== day); setClassData({ ...classData, days: updatedDays });
                    }}
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
            {classData.days?.length > 0 && (
              <p className="text-sm text-gray-600 mt-2"> Selected days: <strong>{classData.days.join(", ")}</strong> </p> )}
          </div>
          <div>
            <label htmlFor="classTime" className="block text-gray-700"> Class Time </label>
            <input type="time" id="classTime" className="w-full px-3 py-2 border rounded" value={classData.time} onChange={(e) => setClassData({ ...classData, time: e.target.value }) } required />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose} > Cancel </button>
            <button    type="submit" className="px-4 py-2 bg-[#43699c] text-white rounded hover:bg-[#365f8a]">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
