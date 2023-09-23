import React from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
// import GuestSearch from './components/GuestSearch'; 
import SavedBooks from './pages/SavedBooks'; 
import LoginForm from './components/LoginForm'; 
import SignupForm from './components/SignupForm'; 

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/savedbooks" element={<SavedBooks />} />
        {/* <Route path="/guestsearch" element={<GuestSearch />} /> */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>    
  );
}

export default App;
