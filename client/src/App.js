import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Navigate to="/home" /> } />
        <Route path="/home" element={ <HomePage /> } />
        <Route path="/savedbooks" element={ <SavedBooks /> } />
        <Route path="/searchbooks" element={ <SearchBooks /> } />
        <Route path="/login" element={ <LoginForm /> } />
        <Route path="/signup" element={ <SignupForm /> } />
      </Routes>
    </div>
  );
}

export default App;
