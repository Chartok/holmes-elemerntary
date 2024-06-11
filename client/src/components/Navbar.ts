import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";


function Navbar () {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Do not render navbar on home page if user is not logged in
  const location = useLocation();

  if (!user && location.pathname === '/home') {
    return null;
  }

  const onLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }}>

            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>Home </Link>

              {/* If user is not logged in or not registered, do not show the link to collection */}

            {!user?
              <></>
              :
              <>
                <Link to="/savedbooks">Collection</Link>
              </>
            }

          </Typography>
          <Box alightitems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
            {/** If user is logged in, show logout button, else show login and register buttons */}
            {user ? 
              <>
                <Button style={{ textDecoration: "none", color: "white" }} onClick={onLogout}>Logout</Button>
              </>
              :
              <>
                <Button style={{ textDecoration: "none", color: "white" }} component={Link} to="/login">Login</Button>
                <Button style={{ textDecoration: "none", color: "white" }} component={Link} to="/signup">Register</Button>
              </>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
