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

function AnimatedRoutes() {
  const location = useLocation();

  );
}

function App() {
  return(
    <div>
      <Router>
        
      </Router>
    </div>
  )
}

export default App
