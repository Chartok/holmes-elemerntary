import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


function Navbar () {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>Home </Link>
            <Link to="/login" style={{ textDecoration: "none", color: "white" }}> Login</Link>
            <Link to="/signup" style={{ textDecoration: "none", color: "white" }}> Register</Link>
            <Link to="/searchBooks" style={{ textDecoration: "none", color: "white" }}> SearchBooks</Link>
            <Link to="/savedBooks" style={{ textDecoration: "none", color: "white" }}> SavedBooks</Link>
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
