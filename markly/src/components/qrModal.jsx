import React, { useState, useEffect, useCallback } from "react";
import QRCode from "react-qr-code";

export default function QRCodeModal({ isOpen, onClose, classId }) {
  const [expiry, setExpiry] = useState("5m");
  const [qrValue, setQrValue] = useState("");

  // Memoize function so ESLint is happy
  const generateQrCode = useCallback(() => {
    const timestamp = Date.now();
    const newQrValue = `https://markly.onrender.com/api/attendance/record?classId=${classId}&expiry=${expiry}&t=${timestamp}`;


    setQrValue(newQrValue);
  }, [classId, expiry]);

  useEffect(() => {
    if (isOpen) {
      generateQrCode();
    }
  }, [isOpen, generateQrCode]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Class QR Code</h2>

        {/* Expiry Dropdown */}
        <div className="mb-4">
          <label className="mr-2 font-medium">Expiry:</label>
          <select
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="5m">5 minutes</option>
            <option value="15m">15 minutes</option>
            <option value="30m">30 minutes</option>
            <option value="1h">1 hour</option>
            <option value="24h">24 hours</option>
          </select>
        </div>

        {/* QR Code */}
        {qrValue && <QRCode value={qrValue} size={200} />}

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={generateQrCode}
          >
            Regenerate
          </button>
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
