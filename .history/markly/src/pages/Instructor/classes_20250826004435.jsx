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

                <div>
                    {/* Class list would go here */}
                    <p className="text-gray-600">Class List</p>

                </div>
                </div>
            </main>
        </div>
    );
}