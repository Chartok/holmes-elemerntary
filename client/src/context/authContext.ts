// @ts-nocheck
import React, { createContext, useReducer } from 'react';
import jwt_decode from 'jwt-decode';

// Check for 'null' token before decoding
const token = localStorage.getItem("token");

/** @type {{ user: { exp: number } | null }} */
const initialState = {
    user: null,
};

if (token) {
    /** @type {{ exp: number }} */
    const decodedToken = jwt_decode(token);
    // Decode token and initialize user state if token is valid
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        // TODO: Add function to refresh token
    } else {
        initialState.user = decodedToken;
    }

}


const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
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

/**
 * @param {React.JSX.IntrinsicAttributes & React.ProviderProps<{ user: any; login: (userData: any) => void; logout: () => void; }>} props
 */
function AuthProvider({ children }) {
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    const login = (userData) => {
        localStorage.setItem("token", userData.token);
        dispatch({
            type: "LOGIN",
            payload: userData
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
        // TODO: Inform user they've been logged out
    }


    return (
        <AuthContext.Provider
            value={ { user: state.user, login, logout } }>
            { children }
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
