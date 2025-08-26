import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header({ isLoggedIn: propIsLoggedIn, isTeacher: propIsTeacher }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");

  if (propIsLoggedIn !== undefined && propIsTeacher !== undefined) {
    setIsLoggedIn(propIsLoggedIn);
    setIsTeacher(propIsTeacher);
  } else if (token) {
    setIsLoggedIn(true);
    setIsTeacher(role?.toLowerCase() === "teacher");
  }
}, [propIsLoggedIn, propIsTeacher]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    window.location.href = "/login";
  };

  const navLinkClass = ({ isActive }) =>
    `text-gray-700 px-4 h-full flex items-center transition-colors duration-200 ${
      isActive ? "bg-[#43699c] text-white" : "hover:bg-[#43699c] hover:text-white"
    }`;

  let content;

  if (isLoggedIn && isTeacher) {
    content = (
      <div className="container mr-20 flex flex-col md:flex-row justify-between items-center text-[20px] h-full">
        <div className="logo font-bold text-[#43699c] text-[30px] mb-2 md:mb-0">Markly</div>
        <nav className="flex flex-col md:flex-row h-full items-center">
          <NavLink to="/teacherdashboard" end className={navLinkClass}>Dashboard</NavLink>
          <NavLink to="/teacherprofile" className={navLinkClass}>Profile</NavLink>
          <NavLink to="/teacherclasses" className={navLinkClass}>Classes</NavLink>
          <NavLink to="/teacherschedule" className={navLinkClass}>Schedule</NavLink>
          <button onClick={handleLogout} className="text-gray-700 px-4 h-full flex items-center hover:bg-[#43699c] hover:text-white transition-colors duration-200">
            Logout
          </button>
        </nav>
      </div>
    );
  } else if (isLoggedIn && !isTeacher) {
    content = (
      <div className="container mr-20 flex flex-col md:flex-row justify-between items-center text-[20px] h-full">
        <div className="logo font-bold text-[#43699c] text-[30px] mb-2 md:mb-0">Markly</div>
        <nav className="flex flex-col md:flex-row h-full items-center">
          <NavLink to="/studentdashboard" end className={navLinkClass}>Dashboard</NavLink>
          <NavLink to="/studentprofile" className={navLinkClass}>Profile</NavLink>
          <NavLink to="/studentclasses" className={navLinkClass}>Classes Attended</NavLink>
          <button onClick={handleLogout} className="text-gray-700 px-4 h-full flex items-center hover:bg-[#43699c] hover:text-white transition-colors duration-200">
            Logout
          </button>
        </nav>
      </div>
    );
  } else {
    content = (
      <div className="container mr-20 flex flex-col md:flex-row justify-between items-center text-[20px] h-full">
        <div className="logo font-bold text-[#43699c] text-[30px] mb-2 md:mb-0">Markly</div>
        <nav className="flex flex-col md:flex-row h-full items-center">
          <NavLink to="/login" className={navLinkClass}>Login</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
        </nav>
      </div>
    );
  }

  return (
    <header className="header top-0 left-0 right-0 bg-white-100 mr-2 flex justify-between items-center shadow-md h-20 w-full z-100">
      <img src="/icon.png" alt="Logo" className="h-25 w-25 ml-10" />
      {content}
    </header>
  );
}
