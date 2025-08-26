import React from "react";
import Header from "../../components/Header.jsx";

export default function Classes() {
    const [modal, setModal] = React.useState(false);


    }
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
                            <label htmlFor="class-name" className="block text-gray-700">Class Name</label>
                            <input type="text" id="className" name="className" className="w-full px-3 py-2 border rounded" value={} required />
                        </div>
                        <div>
                            <label htmlFor="classCode" className="block text-gray-700">Class Code</label>
                            <input type="text" id="classCode" name="classCode" className="w-full px-3 py-2 border rounded" required />
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
            </main>
        </div>
    );
}