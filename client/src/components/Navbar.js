"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const authContext_1 = require("../context/authContext");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
function Navbar() {
    let navigate = (0, react_router_dom_1.useNavigate)();
    const { user, logout } = (0, react_1.useContext)(authContext_1.AuthContext);
    // Do not render navbar on home page if user is not logged in
    const location = (0, react_router_dom_1.useLocation)();
    if (!user && location.pathname === '/home') {
        return null;
    }
    const onLogout = () => {
        logout();
        navigate("/home");
    };
    return (<material_1.Box sx={{ flexGrow: 1 }}>
      <material_1.AppBar position="static">
        <material_1.Toolbar>
          <material_1.Typography component="div" sx={{ flexGrow: 1 }}>

            <react_router_dom_1.Link to="/home" style={{ textDecoration: "none", color: "white" }}>Home </react_router_dom_1.Link>

              {/* If user is not logged in or not registered, do not show the link to collection */}

            {!user ?
            <></>
            :
                <>
                <react_router_dom_1.Link to="/savedbooks">Collection</react_router_dom_1.Link>
              </>}

          </material_1.Typography>
          <material_1.Box alightitems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
            {/** If user is logged in, show logout button, else show login and register buttons */}
            {user ?
            <>
                <material_1.Button style={{ textDecoration: "none", color: "white" }} onClick={onLogout}>Logout</material_1.Button>
              </>
            :
                <>
                <material_1.Button style={{ textDecoration: "none", color: "white" }} component={react_router_dom_1.Link} to="/login">Login</material_1.Button>
                <material_1.Button style={{ textDecoration: "none", color: "white" }} component={react_router_dom_1.Link} to="/signup">Register</material_1.Button>
              </>}
          </material_1.Box>
        </material_1.Toolbar>
      </material_1.AppBar>
    </material_1.Box>);
}
;
exports.default = Navbar;
