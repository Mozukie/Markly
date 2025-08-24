import React, { useState } from "react";
import Header from "../components/Header.jsx";

export default function Login() {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
      <Header isLoggedIn={false} />
      <div className="min-h-screen flex items-center justify-between px-4">
        {/* Login Panel on the left with margin */}
        <div
          className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full ml-30 flex flex-col items-center"
          style={{ minWidth: '400px' }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login to Markly</h2>
          <form className="w-full flex flex-col items-center">
            <div className="mb-4 w-3/4">
              <label className="block text-gray-700 mb-2 text-center" htmlFor="email">Email</label>
              <input type="email" id="email" className="w-full px-3 py-2 border rounded text-center" required />
            </div>
            <div className="mb-6 w-3/4">
              <label className="block text-gray-700 mb-2 text-center" htmlFor="password">Password</label>
              <input type="password" id="password" className="w-full px-3 py-2 border rounded text-center" required />
            </div>
            <button type="submit" className="w-3/4 bg-[#43699c] text-white py-2 rounded hover:bg-[#365f8a] transition-colors">Login</button>
          </form>
          <p className="mt-4 text-center">
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
        {/* Register Panel on the right with margin, slides in */}
        <div className={`bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full mr-30 flex flex-col items-center transition-all duration-500 z-30 mt-24 ${showRegister ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`} style={{ minWidth: '500px', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}>
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form className="w-full flex flex-col items-center">
            <div className="mb-4 w-3/4 flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 mb-2 text-center" htmlFor="reg-firstname">First Name</label>
                <input type="text" id="reg-firstname" className="w-full px-3 py-2 border rounded text-center" required />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 mb-2 text-center" htmlFor="reg-lastname">Last Name</label>
                <input type="text" id="reg-lastname" className="w-full px-3 py-2 border rounded text-center" required />
              </div>
            </div>
            <div className="mb-4 w-3/4">
              <label className="block text-gray-700 mb-2 text-center" htmlFor="reg-email">Email</label>
              <input type="email" id="reg-email" className="w-full px-3 py-2 border rounded text-center" required />
            </div>
            <div className="mb-4 w-3/4">
              <label className="block text-gray-700 mb-2 text-center" htmlFor="reg-password">Password</label>
              <input type="password" id="reg-password" className="w-full px-3 py-2 border rounded text-center" required />
            </div>
            <div className="mb-4 w-3/4">
              <label className="block text-gray-700 mb-2 text-center" htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" className="w-full px-3 py-2 border rounded text-center" required />
            </div>
            <div>
                <input type="checkbox" id="teacher-checkbox" className="mt-4" />
                <label htmlFor="consent" className="text-gray-600 text-sm mt-2"> I consent to my data being used for registration purposes.</label>
            </div>
            <button type="submit" className="w-3/4 mt-4 bg-[#43699c] text-white py-2 rounded hover:bg-[#365f8a] transition-colors">Register</button>
          </form>
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-4xl"
            onClick={() => setShowRegister(false)}
            style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          >
            &times;
          </button>
        </div>
      </div>

      {/* Welcome to Markly on the right side */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 mr-40 flex flex-col items-center"> 
        <img src="/icon.png" height={150} width={150} className="mb-4" alt="Markly Icon" />
        <div className="text-4xl fredoka font-bold text-[#43699c] text-center">
          Welcome to Markly
        </div>
        <div className="text-center mt-4 text-gray-800">
          <p>Markly is a modern attendance management platform designed</p>
          <p>to make classroom check-ins simple, reliable, and secure.</p>
          <p>Its purpose is to eliminate the inefficiencies of manual attendance-taking</p>
          <p>and provide a seamless experience for both teachers and students.</p>
        </div>
      </div>

    </>
  );
}