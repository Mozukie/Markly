import React from "react";
import Header from "../../components/Header.jsx";

export default function Classes() {
    const [modal, setModal] = React.useState(false);
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
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                                    <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={toggleModal}>Cancel</button>
                                    <button type="button" className="px-4 py-2 bg-[#43699c] text-white rounded hover:bg-[#365f8a]">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div>
                    {/* Class list would go here */}
                    <p className="text-gray-600">Class List</p>
                    
                </div>
                </div>
            </main>
        </div>
    );
}