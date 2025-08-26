import React from "react";
import Header from "../../components/Header.jsx";

export default function addclass() {
    return (
        <div>
        <Header isLoggedIn={true} isTeacher={true}/>
        <main className="container mx-auto p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg" style={{ minWidth: '600px', marginTop: '80px' }}>
            <h1 className="text-3xl font-bold mb-4">Add Class</h1>
    
        
            </div>
        </main>
        </div>
    );
    }