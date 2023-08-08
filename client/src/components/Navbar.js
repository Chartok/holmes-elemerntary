import { Appbar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { AuthContext } from "../utils/authContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


function Navbar () {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Appbar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
            <link to="/login" style={{ textDecoration: "none", color: "white" }}>Login</link>
            <link to="/signup" style={{ textDecoration: "none", color: "white" }}>Register</link>
            <link to="/searchBooks" style={{ textDecoration: "none", color: "white" }}>Search Books</link>
            <link to="/savedBooks" style={{ textDecoration: "none", color: "white" }}>Saved Books</link>
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
      </Appbar>
    </Box>
  );
};

export default Navbar;
