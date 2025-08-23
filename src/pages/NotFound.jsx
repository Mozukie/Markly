import React from "react";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">Page Not Found</p>
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

export default NotFound;