import React from 'react';

    const modal = ({isOpen, onClose, onSave}) => {
        if (!isOpen) return null;
    return (   
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Add New Class</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="classSubject">Class Subject</label>
                        <input type="text" id="classSubject" className="w-full px-3 py-2 border rounded" placeholder="Enter class subject" />
                    </div>  
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="classCode">Class Code</label>
                        <input type="text" id="classCode" className="w-full px-3 py-2 border rounded" placeholder="Enter class code" />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="classTime">Class Time</label>
                        <input type="text" id="classTime" className="w-full px-3 py-2 border rounded" placeholder="Enter class time" />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose}>Cancel</button>
                        <button type="button" className="px-4 py-2 bg-[#43699c] text-white rounded hover:bg-[#365f8a]" onClick={onSave}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
    };
export default modal;
