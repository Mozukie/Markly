import React from 'react';

    const modal = ({isOpen, onClose, onSave}) => {
        if (!isOpen) return null;
    return (   
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="flex justify-end space-x-4">
                        <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose}>Cancel</button>
                        <button type="button" className="px-4 py-2 bg-[#43699c] text-white rounded hover:bg-[#365f8a]" onClick={onSave}>Save</button>
            </div>
        </div>
    );
    };
export default modal;
