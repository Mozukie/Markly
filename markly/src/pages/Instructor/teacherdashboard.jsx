import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";


export default function TeacherDashboard() {
    const [user, setUser] = useState({});
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    
      useEffect(() => {

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const role = localStorage.getItem("role") || sessionStorage.getItem("role");

        if(!token || !role) {
          // If no token or role, redirect to login
          window.location.href = "/login";
          return;
        }

        const fetchUser = async () => {
          try {
            const res = await fetch("https://markly.onrender.com/api/auth/me", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // ✅ Use the token variable here
              },
            });
    
            if (!res.ok) throw new Error("Failed to fetch user");
            const data = await res.json();
            setUser(data);
          } catch (err) {
            console.error(err.message);
          }
        };
    
        fetchUser();
      }, [token]); // ✅ Optional: include token as a dependency
    
      if (!user) return <p className="text-center mt-20">Loading...</p>;
    
    return (
        <div>
        <Header isLoggedIn={true} isTeacher={true} />
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
