import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";

export default function StudentDashboard() {
    return (
        <div>
        <Header isLoggedIn={true} isTeacher={false}/>
        <main className="container mx-auto p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg" style={{ minWidth: '600px', marginTop: '10px' }}>
            <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
            <p>Welcome to your dashboard! Here you can manage your classes, view your schedule, and update your profile.</p>
            <div className="mt-6 space-x-4">
                <Link to="/studentclasses" className="px-4 py-2 bg-[#43699c] text-white rounded hover:bg-[#365f8a] transition-colors">My Classes</Link>
                <Link to="/studentschedule" className="px-4 py-2 bg-[#43699c] text-white rounded hover:bg-[#365f8a] transition-colors">My Schedule</Link>
                <Link to="/studentprofile" className="px-4 py-2 bg-[#43699c] text-white rounded hover:bg-[#365f8a] transition-colors">My Profile</Link>
            </div>
            </div>
        </main>
        </div>
    );
    }