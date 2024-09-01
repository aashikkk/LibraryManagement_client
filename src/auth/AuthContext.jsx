/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from "react";

const AuthContext = createContext(null);

const initialState = {
    user: sessionStorage.getItem("userData")
        ? JSON.parse(sessionStorage.getItem("userData"))
        : null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            // console.log("This is action.payload from AuthContext  ", action.payload);
            return {
                ...state,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const loggedIn = (userData) => {
        dispatch({ type: "LOGIN", payload: userData });
        sessionStorage.setItem("userData", JSON.stringify(userData));
    };

    const loggedOut = () => {
        dispatch({ type: "LOGOUT" });
        sessionStorage.removeItem("userData");
    };

    return (
        <AuthContext.Provider value={{ user: state.user, loggedIn, loggedOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
