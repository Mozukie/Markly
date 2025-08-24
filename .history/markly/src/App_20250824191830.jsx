import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; 
import React from 'react' 
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import About from './components/About.jsx'
import StudentDashboard from './pages/Students/studentdashboard.jsx'


function App() {
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
        <Routes location={location}>
          <Route path="/" element={<Home/>} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/about" element={<About/>} />          
          <Route path="/studentdashboard" element={<StudentDashboard/>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}


export default App
