import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from '../pages/SignupForm';
import LoginForm from '../pages/LoginForm';

import { useAuth } from '../context/authContext';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const auth = useAuth();

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        Google Books
      </Link>
      <div>
        {auth.loggedIn ? (
          <>
            <Link className="btn btn-danger m-2" to="/saved">
              See Your Books
            </Link>
            <button className="btn btn-danger m-2" onClick={auth.logout}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn btn-success m-2" onClick={auth.login}>
            Login
          </button>
        )}
      </div>
    </div>
  </nav>
    </>
  );
};

export default AppNavbar;
