import React from "react";
import { Link } from "react-router-dom";


export default function Footer() { 
    return(
        <footer className="bg-gray-800 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Markly. All rights reserved.</p>
                <div className="mt-2 space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/about" className="hover:underline">About</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                    <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}