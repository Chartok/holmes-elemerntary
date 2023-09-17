import React from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchBooks from './pages/SearchBooks'; 
import LibraryDashboard from './pages/LibraryDashboard'; 
import LoginForm from './pages/LoginForm'; 
import SignupForm from './pages/SignupForm'; 

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/LibraryDashboard" element={<LibraryDashboard />} />
        <Route path="/searchBooks" element={<SearchBooks />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>    
  );
}

export default App;