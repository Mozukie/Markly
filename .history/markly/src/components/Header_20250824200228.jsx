import { NavLink } from "react-router-dom";

export default function Header() {
  const isLoggedIn = false;
  const isTeacher = false;

  return (
    <header className="header top-0 left-0 right-0 bg-white-100 mr-2 flex justify-between items-center shadow-md h-26 w-full z-100">
      <img src="/icon.png" alt="Logo" className="h-25 w-25 ml-10" />
      {isLoggedIn ? (
        isTeacher ? (
          <div className="container mr-20 flex flex-col md:flex-row justify-between items-center text-[20px] h-full">
            <div className="logo font-bold text-[#43699c] text-[30px] mb-2 md:mb-0">Markly</div>
            <nav className="flex flex-col md:flex-row h-full items-center">
              <NavLink to="/teacherdashboard" className={({ isActive }) => `text-gray-700 px-4 h-full flex items-center  transition-colors duration-200 ${isActive ? "bg-[#43699c] text-white" : "hover:bg-[#43699c] hover:text-white"}`}>
                Dashboard
              </NavLink>
              <NavLink to="/teacherprofile" className={({ isActive }) => `text-gray-700 px-4 h-full flex items-center  transition-colors duration-200 ${isActive ? "bg-[#43699c] text-white" : "hover:bg-[#43699c] hover:text-white"}`}>
                Profile
              </NavLink>
              <NavLink to="/teacherclasses" className={({ isActive }) => `text-gray-700 px-4 h-full flex items-center  transition-colors duration-200 ${isActive ? "bg-[#43699c] text-white" : "hover:bg-[#43699c] hover:text-white"}`}>
                Classes
              </NavLink>
              <NavLink to="/teacherschedule" className={({ isActive }) => `text-gray-700 px-4 h-full flex items-center  transition-colors duration-200 ${isActive ? "bg-[#43699c] text-white" : "hover:bg-[#43699c] hover:text-white"}`}>
                Schedule
              </NavLink>
              <NavLink to="/teacherschedule" className={({ isActive }) => `text-gray-700 px-4 h-full flex items-center  transition-colors duration-200 ${isActive ? "bg-[#43699c] text-white" : "hover:bg-[#43699c] hover:text-white"}`}>
                Schedule
              </NavLink>
              <NavLink to="/logout" className="text-gray-700 px-4 h-full flex items-center  hover:bg-[#43699c] hover:text-white transition-colors duration-200">
                Logout
              </NavLink>
            </nav>
          </div>
        ) : (
          <div className="container mr-20 flex flex-col md:flex-row justify-between items-center text-[20px] h-full">
            <div className="logo font-bold text-[#43699c] text-[30px] mb-2 md:mb-0">Markly</div>
            <nav className="flex flex-col md:flex-row h-full items-center">
              <NavLink to="/studentdashboard" className={({ isActive }) => `text-gray-700 px-4 h-full flex items-center transition-colors duration-200 ${isActive ? "bg-[#43699c] text-white" : "hover:bg-[#43699c] hover:text-white"}`}>
                Dashboard
              </NavLink>
              <NavLink to="/studentprofile" className={({ isActive }) => `text-gray-700 px-4 h-full flex items-center transition-colors duration-200 ${isActive ? "bg-[#43699c] text-white" : "hover:bg-[#43699c] hover:text-white"}`}>
                Profile
              </NavLink>
              <NavLink to="/studentclasses" className={({ isActive }) => `text-gray-700 px-4 h-full flex items-center transition-colors duration-200 ${isActive ? "bg-[#43699c] text-white" : "hover:bg-[#43699c] hover:text-white"}`}>
                Classes
              </NavLink>
              <NavLink to="/logout" className="text-gray-700 px-4 h-full flex items-center  hover:bg-[#43699c] hover:text-white transition-colors duration-200">
                Logout
              </NavLink>
            </nav>
          </div>
        )
      ) : (
        <div className="container mr-20 flex flex-col md:flex-row justify-between items-center text-[20px] h-full">
          <div className="logo font-bold text-[#43699c] text-[30px] mb-2 md:mb-0">Markly</div>
          <nav className="flex flex-col md:flex-row h-full items-center">
            <NavLink to="/login" className={({ isActive }) => `text-gray-700 px-4 h-full flex items-center  transition-colors duration-200 ${isActive ? "bg-[#43699c] text-white" : "hover:bg-[#43699c] hover:text-white"}`}>
              Login
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `text-gray-700 px-4 h-full flex items-center  transition-colors duration-200 ${isActive ? "bg-[#43699c] text-white" : "hover:bg-[#43699c] hover:text-white"}`}>
              About
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}