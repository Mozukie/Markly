import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import About from './components/About.jsx'
import NewProfile from './pages/NewProfile.jsx'
import StudentDashboard from './pages/Students/studentdashboard.jsx'
import TeacherDashboard from './pages/Instructor/teacherdashboard.jsx'
import Classes from './pages/Instructor/classes.jsx'
import ClassAttendance from './pages/Instructor/classattendance.jsx'
import TeacherProfile from './pages/Instructor/teacherprofile.jsx'
import ClassAttended from './pages/Students/classAttended.jsx'


function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <Routes location={location} key={location.pathname}>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/newprofile" element={<NewProfile />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classattendance" element={<ClassAttendance/>}/>
          <Route path="/teacherprofile" element={<TeacherProfile/>}/>
          <Route path="/classattended" element={<ClassAttended/>}/> 
         
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}


function App() {
  return(
    <div>
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  )
}

export default App
