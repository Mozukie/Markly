import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import axios from "axios";

export default function TeacherDashboard() {
    const [user, setUser] = useState({});
    
    useEffect(() => {
        const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }
        try {
            const res = await axios.get("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data);
        } catch (err) {
            console.error("Error fetching user data:", err.response?.data || err.message);
        }
        };
        fetchUserData();
    }, []);
    
    return (
        <div>
        <Header isLoggedIn={true} isTeacher={user.role === "Teacher"} />
        <main className="container mx-auto p-4">
            <div
            className="bg-white p-6 rounded-lg shadow-lg"
            style={{ minHeight: '70vh' }}
            >
            <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
            <p>Welcome, {user.firstname} {user.lastname}!</p>
            {/* Additional dashboard content can go here */}
            </div>
        </main>
        </div>
    );
    }
