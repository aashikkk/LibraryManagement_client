import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookPage from "./pages/BookPage";

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

        //v5
        // <AuthProvider>
        //     <Router>
        //         <Routes>
        //             <Route path="/" element={<HomePage />} />
        //             <Route path="/login" element={<LoginPage />} />
        //             <Route path="/register" element={<RegisterPage />} />
        //             {/* Protected route, only accessible if user is authenticated */}
        //             <Route
        //                 path="/books"
        //                 element={
        //                     <ProtectedRoute>
        //                         <BookPage />
        //                     </ProtectedRoute>
        //                 }
        //             />
        //         </Routes>
        //     </Router>
        // </AuthProvider>
    );
};

export default App;
