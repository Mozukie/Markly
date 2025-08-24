import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
import User from "../../../../markly-backend/models/User.js";

export default function StudentDashboard() {
    return (
        <div>
        <Header isLoggedIn={true} isTeacher={false}/>
        <main className="container mx-auto p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg" style={{ minWidth: '600px', marginTop: '100px' }}>
                <h1 className="text-3xl font-bold mb-4 text-center">Student Dashboard</h1>
                <p className="text-gray-700 mb-6 text-center">Name: ${User.firstname}</p>
                <p className="text-gray-700 mb-6 text-center">Role: {User.role}</p>
            </div>
        </main>
        </div>
    );
    }