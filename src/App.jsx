import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { logIn, signUp } from './firebase'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import SignUp from './pages/sign in/signup';
import CramDashboard from './pages/Dashboard/dashboard';

function App() {
  return (
    /*<Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<CramDashboard />} />
      </Routes>
    </Router> */
    
      <CramDashboard />
      
  );
}

export default App
