import React, { useContext } from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import { AuthContext } from './context/authContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchBooks from './pages/SearchBooks'; 
import SavedBooks from './pages/SavedBooks'; 
import LoginForm from './pages/LoginForm'; 
import SignupForm from './pages/SignupForm'; 

function App() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <Routes>
        {loggedIn ? (
          <>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/savedBooks" element={<SavedBooks />} />
        </>
        ) : (
          <>
        <Route path="/searchBooks" element={<SearchBooks />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        </>
        )}
      </Routes>
    </div>    
  );
}

export default App;