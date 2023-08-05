import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './context/authContext'; 
import client from './apolloClient'; 

import Navbar from './components/Navbar'; 
import SearchBooks from './pages/SearchBooks'; 
import SavedBooks from './pages/SavedBooks'; 
import LoginForm from './pages/LoginForm'; 
import SignupForm from './pages/SignupForm'; 

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" component={SearchBooks} />
            <Route exact path="/saved" component={SavedBooks} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignupForm} />
          </Routes>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;