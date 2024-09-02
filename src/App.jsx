import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookPage from "./pages/BookPage";
import RegisterSuccessPage from "./pages/RegisterSuccessPage";
import RegisterFailed from "./components/RegisterFailed";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
            {
                path: "register/success",
                element: <RegisterSuccessPage />,
            },
            {
                path: "register/failed",
                element: <RegisterFailed />,
            },
        ],
    },
    {
        path: "/books",
        element: (
            <ProtectedRoute>
                <BookPage />
            </ProtectedRoute>
        ),
    },
]);

const App = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;
