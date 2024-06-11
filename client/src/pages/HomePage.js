"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const SearchBooks_1 = __importDefault(require("../components/SearchBooks"));
const material_1 = require("@mui/material");
const authContext_1 = require("../context/authContext");
const react_2 = require("react");
const HomePage = () => {
    const { user } = (0, react_2.useContext)(authContext_1.AuthContext);
    return (<material_1.Container>
            <material_1.Box textAlign='center' py={10}>
                <material_1.Typography variant="h2" gutterBottom>
                    Welcome to Book Finder
                </material_1.Typography>
                <material_1.Typography>
                    Discover new books to add to your collection.
                </material_1.Typography>
                <material_1.Box mt={4}>
                    {user ?
            <>
                            <material_1.Box m={4} p={2}>
                                <SearchBooks_1.default />
                            </material_1.Box>
                        </>
            :
                <>
                            <material_1.Typography>
                                Sign up to create your personal library, or login to continue exploring.
                            </material_1.Typography>

                            <material_1.Button variant="contained" color="primary" component={react_router_dom_1.Link} to="/signup">
                                Sign Up
                            </material_1.Button>

                            <material_1.Button variant="outlined" color="primary" component={react_router_dom_1.Link} to="/login">
                                Login
                            </material_1.Button>

                            <hr />

                            <material_1.Box mt={20}>

                                Explore as a guest
                                {!user ?
                        <>
                                        <SearchBooks_1.default />
                                    </>
                        :
                            <>
                                    </>}
                            </material_1.Box>
                        </>}
                </material_1.Box>
            </material_1.Box>
        </material_1.Container>);
};
exports.default = HomePage;
