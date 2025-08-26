import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";



export default function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [userLogin, setUserLogin]  = useState({"email": "", "password": ""});
  const [userRegister, setUserRegister] = useState({"firstname": "", "lastname": "", "email": "", "password": "", "confirmPassword": ""});
  const [rememberMe, setRememberMe] = useState(false);
  

  const navigate = useNavigate();


const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("https://markly.onrender.com/api/auth/login", userLogin);
    console.log("Login Success:", res.data);
    alert("Login successful!");

    // Store token and role based on "Remember Me"
    if (rememberMe) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
      } else {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("role", res.data.role);
      }


    // Navigate based on role
    if (res.data.role === "Teacher") {
      navigate("/teacherdashboard");
    } else {
      navigate("/studentdashboard");
    }
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
    alert("Login failed!");
  }
};


const handleRegister = async (e) => {
  e.preventDefault();
  if (userRegister.password !== userRegister.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  try {
    const res = await axios.post("https://markly.onrender.com/api/auth/register", {
      firstname: userRegister.firstname,
      lastname: userRegister.lastname,
      email: userRegister.email,
      password: userRegister.password
    });
    console.log("Registration Success:", res.data);
    localStorage.setItem("token", res.data.token);
    if (res.data.role) {
      localStorage.setItem("role", res.data.role); // ✅ Store role if available
    }
    alert("Registration successful!");
    navigate("/newprofile");
    setShowRegister(false);
  } catch (err) {
    console.error("Registration Error:", err.response?.data || err.message);
    alert("Registration failed!");  
  }
};


  return (
    <>
      <Header isLoggedIn={false} />
      <div className=" flex items-center justify-between px-4">
        {/* Login Panel */}
        <div
          className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full ml-24 flex flex-col items-center z-20"
          style={{ minWidth: '300px' }}
        >
          <h2 className="text-xl font-bold mb-4 text-center">Login to Markly</h2>
          <form className="w-full flex flex-col items-center" onSubmit={handleLogin}>
            <div className="mb-3 w-3/4">
              <label className="block text-gray-700 mb-1 text-center" htmlFor="email">Email</label>
              <input type="email" id="email" className="w-full px-2 py-1.5 border rounded text-center" value={userLogin.email} onChange={(e) => setUserLogin({... userLogin, email: e.target.value})} required />
            </div>
            <div className="mb-4 w-3/4">
              <label className="block text-gray-700 mb-1 text-center" htmlFor="password">Password</label>
              <input type="password" id="password" className="w-full px-2 py-1.5 border rounded text-center" value={userLogin.password} onChange={(e) => setUserLogin({... userLogin, password: e.target.value})} required />
            </div>
            <div className="mb-4 w-3/4 text-sm flex items-center justify-center">
              <label htmlFor="rememberMe" className="text-gray-600 ml-1 text-sm"> Remember me</label>
              <input  type="checkbox" id="rememberMe" className="mt-1 ml-2" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            </div>
            <button type="submit" className="w-3/4 bg-[#43699c] text-white py-1.5 rounded hover:bg-[#365f8a] transition-colors">Login</button>
          </form>
          <p className="mt-3 text-center text-sm">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-blue-500 hover:underline focus:outline-none"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </p>
        </div>

        {/* Register Panel */}
        <div
          className={`bg-white p-6 rounded-xl shadow-2xl max-w-md w-full mt-5 mr-24 flex flex-col items-center transition-all duration-500 z-30 ${showRegister ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}
          style={{ minWidth: '420px', borderTopLeftRadius: '0.75rem', borderBottomLeftRadius: '0.75rem' }}
        >
          <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
          <form className="w-full flex flex-col items-center" onSubmit={handleRegister}>
            <div className="mb-3 w-3/4 flex gap-3">
              <div className="w-1/2">
                <label className="block text-gray-700 mb-1 text-center" htmlFor="reg-firstname">First Name</label>
                <input type="text" id="reg-firstname" className="w-full px-2 py-1.5 border rounded text-center" value={userRegister.firstname} onChange={(e) => setUserRegister({... userRegister, firstname : e.target.value})} required />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 mb-1 text-center" htmlFor="reg-lastname">Last Name</label>
                <input type="text" id="reg-lastname" className="w-full px-2 py-1.5 border rounded text-center"  value={userRegister.lastname} onChange={(e) => setUserRegister({... userRegister, lastname : e.target.value})} required />
              </div>
            </div>
            <div className="mb-3 w-3/4">
              <label className="block text-gray-700 mb-1 text-center" htmlFor="reg-email">Email</label>
              <input type="email" id="reg-email" className="w-full px-2 py-1.5 border rounded text-center"  value={userRegister.email} onChange={(e) => setUserRegister({... userRegister, email : e.target.value})} required />
            </div>
            <div className="mb-3 w-3/4">
              <label className="block text-gray-700 mb-1 text-center" htmlFor="reg-password">Password</label>
              <input type="password" id="reg-password" className="w-full px-2 py-1.5 border rounded text-center"  value={userRegister.password} onChange={(e) => setUserRegister({... userRegister, password : e.target.value})} required />
            </div>
            <div className="mb-3 w-3/4">
              <label className="block text-gray-700 mb-1 text-center" htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" className="w-full px-2 py-1.5 border rounded text-center"  value={userRegister.confirmPassword} onChange={(e) => setUserRegister({... userRegister, confirmPassword : e.target.value})} required />
            </div>
            <div className="text-sm">
              <input type="checkbox" id="checkbox" className="mt-3" required/>
              <label htmlFor="consent" className="text-gray-600 ml-1"> I consent to my data being used for registration purposes.</label>
            </div>
            <button type="submit" className="w-3/4 mt-3 bg-[#43699c] text-white py-1.5 rounded hover:bg-[#365f8a] transition-colors">Register</button>
          </form>
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl"
            onClick={() => setShowRegister(false)}
          >
            &times;
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 mr-32 flex flex-col items-center"> 
        <img src="/icon.png" height={120} width={120} className="mb-3" alt="Markly Icon" />
        <div className="text-3xl fredoka font-bold text-[#43699c] text-center">
          Welcome to Markly
        </div>
        <div className="text-center mt-3 text-gray-800 text-sm leading-snug">
          <p>Markly is a modern attendance management platform designed</p>
          <p>to make classroom check-ins simple, reliable, and secure.</p>
          <p>Its purpose is to eliminate the inefficiencies of manual attendance-taking</p>
          <p>and provide a seamless experience for both teachers and students.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
