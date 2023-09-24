import React from 'react';
import { Routes, Route, Navigate, useLocation  } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SavedBooks from './pages/SavedBooks'; 
import LoginForm from './components/LoginForm'; 
import SignupForm from './components/SignupForm'; 

function App() {

  const location = useLocation();

  return (
    <div>
      {/* Don't render navbar at '/home' */}
      { location.pathname!=='/home' && <Navbar /> }
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/savedbooks" element={<SavedBooks />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>    
  );
}

export default App;
