import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";

export default function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [userRegister, setUserRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        userLogin
      );
      console.log("Login Success:", res.data);

      if (rememberMe) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
      } else {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("role", res.data.role);
      }

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
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        firstname: userRegister.firstname,
        lastname: userRegister.lastname,
        email: userRegister.email,
        password: userRegister.password,
      });
      console.log("Registration Success:", res.data);
      localStorage.setItem("token", res.data.token);
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
      <main className="flex justify-between items-center px-16 py-12 gap-10">
        {/* Left Side → Login/Register */}
        <div className="relative flex-1 flex justify-center">
          {/* Login Panel */}
          <div
            className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full flex flex-col items-center z-10"
            style={{ minWidth: "300px" }}
          >
            <h2 className="text-xl font-bold mb-4 text-center">Login to Markly</h2>
            <form className="w-full flex flex-col items-center" onSubmit={handleLogin}>
              <div className="mb-3 w-3/4">
                <label className="block text-gray-700 mb-1 text-center" htmlFor="email">Email</label>
                <input type="email" id="email" className="w-full px-2 py-1.5 border rounded text-center"
                  value={userLogin.email} 
                  onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                  required 
                />
              </div>
              <div className="mb-4 w-3/4">
                <label className="block text-gray-700 mb-1 text-center" htmlFor="password">Password</label>
                <input type="password" id="password" className="w-full px-2 py-1.5 border rounded text-center"
                  value={userLogin.password} 
                  onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                  required 
                />
              </div>
              <div className="mb-4 w-3/4 text-sm flex items-center justify-center">
                <input type="checkbox" id="rememberMe" className="mr-2"
                  checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} 
                />
                <label htmlFor="rememberMe" className="text-gray-600"> Remember me</label>
              </div>
              <button type="submit" className="w-3/4 bg-[#43699c] text-white py-1.5 rounded hover:bg-[#365f8a] transition-colors">Login</button>
            </form>
            <p className="mt-3 text-center text-sm">
              Don&apos;t have an account?{" "}
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
          {showRegister && (
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 bg-white p-6 rounded-xl shadow-2xl max-w-md w-full flex flex-col items-center z-20"
              style={{ minWidth: "420px" }}
            >
              <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
              <form className="w-full flex flex-col items-center" onSubmit={handleRegister}>
                <div className="mb-3 w-3/4 flex gap-3">
                  <div className="w-1/2">
                    <label className="block text-gray-700 mb-1 text-center" htmlFor="reg-firstname">First Name</label>
                    <input type="text" id="reg-firstname" className="w-full px-2 py-1.5 border rounded text-center"
                      value={userRegister.firstname}
                      onChange={(e) => setUserRegister({ ...userRegister, firstname: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 mb-1 text-center" htmlFor="reg-lastname">Last Name</label>
                    <input type="text" id="reg-lastname" className="w-full px-2 py-1.5 border rounded text-center"
                      value={userRegister.lastname}
                      onChange={(e) => setUserRegister({ ...userRegister, lastname: e.target.value })}
                      required 
                    />
                  </div>
                </div>
                <div className="mb-3 w-3/4">
                  <label className="block text-gray-700 mb-1 text-center" htmlFor="reg-email">Email</label>
                  <input type="email" id="reg-email" className="w-full px-2 py-1.5 border rounded text-center"
                    value={userRegister.email}
                    onChange={(e) => setUserRegister({ ...userRegister, email: e.target.value })}
                    required 
                  />
                </div>
                <div className="mb-3 w-3/4">
                  <label className="block text-gray-700 mb-1 text-center" htmlFor="reg-password">Password</label>
                  <input type="password" id="reg-password" className="w-full px-2 py-1.5 border rounded text-center"
                    value={userRegister.password}
                    onChange={(e) => setUserRegister({ ...userRegister, password: e.target.value })}
                    required 
                  />
                </div>
                <div className="mb-3 w-3/4">
                  <label className="block text-gray-700 mb-1 text-center" htmlFor="confirm-password">Confirm Password</label>
                  <input type="password" id="confirm-password" className="w-full px-2 py-1.5 border rounded text-center"
                    value={userRegister.confirmPassword}
                    onChange={(e) => setUserRegister({ ...userRegister, confirmPassword: e.target.value })}
                    required 
                  />
                </div>
                <div className="text-sm">
                  <input type="checkbox" id="checkbox" className="mt-3" required />
                  <label htmlFor="checkbox" className="text-gray-600 ml-1">
                    I consent to my data being used for registration purposes.
                  </label>
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
          )}
        </div>

        {/* Right Side → Welcome */}
        <div className="flex-1 flex flex-col items-center text-center px-6">
          <img src="/icon.png" height={120} width={120} className="mb-3" alt="Markly Icon" />
          <div className="text-3xl fredoka font-bold text-[#43699c] mb-3">
            Welcome to Markly
          </div>
          <p className="text-gray-800 text-sm leading-snug">
            Markly is a modern attendance management platform designed<br />
            to make classroom check-ins simple, reliable, and secure.<br />
            Its purpose is to eliminate the inefficiencies of manual attendance-taking<br />
            and provide a seamless experience for both teachers and students.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
