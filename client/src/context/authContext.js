import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null,
};

// Check for 'null' token before decoding
const token = localStorage.getItem("token");
if (token) {
    /** @type {{ exp:number }} */
    const decodedToken = jwtDecode(token);
    // Decode token and initialize user state if token is valid
    if (localStorage.getItem("token")) {
        const decodedToken = jwtDecode(localStorage.getItem("token"));

        if (decodedToken.exp * 10000 < Date.now()) {
            localStorage.removeItem("token");
            // TODO: Add function to refresh token
        } else {
            initialState.user = decodedToken;
        }
    }
}


const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { }
});

function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                user: null
            }
        default:
            return state;

    }
}

function AuthProvider(props) {
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    const login = (userData) => {
        localStorage.setItem("token", userData.token);
        dispatch({
            type: "LOGIN",
            payload: userData
        });
    };

    function logout() {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
        // TODO: Inform user they've been logged out
    }

    return (
        <AuthContext.Provider
            value={ { user: state.user, login, logout } }
            { ...props }>{ props.children }
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
