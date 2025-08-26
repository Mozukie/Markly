// src/components/QRCodeModal.jsx
import React from "react";
import QRCode from "qrcode.react";

export default function QRCodeModal({ isOpen, onClose, classId }) {
  if (!isOpen) return null;

  const qrValue = `${window.location.origin}/join-class/${classId}`;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Class QR Code</h2>
        <QRCode value={qrValue} size={200} />
        <div className="mt-6">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
