import React from "react";

export default function About() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="mt-4 text-lg text-gray-600">This is the About page of our application.</p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-4 py-2 bg-[#43699c] text-white rounded hover:bg-[#365f8a] transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}