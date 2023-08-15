import React from 'react';
import { Routes, Route  } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchBooks from './pages/SearchBooks'; 
import SavedBooks from './pages/SavedBooks'; 
import LoginForm from './pages/LoginForm'; 
import SignupForm from './pages/SignupForm'; 

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/searchBooks" element={<SearchBooks />} />
        <Route path="/savedBooks" element={<SavedBooks />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>    
  );
}

export default App;