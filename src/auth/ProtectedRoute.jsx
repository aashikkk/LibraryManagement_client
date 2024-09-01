/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth"; // Ensure you have the AuthContext set up

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    console.log("ProtectedRoute -> user", user);
    const location = useLocation();

    if (!user || !user.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
