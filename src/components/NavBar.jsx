import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="flex justify-between items-center">
                    <div className="text-white font-bold text-lg">
                        <Link to="/" className="text-white px-3">
                            Online Library
                        </Link>
                    </div>
                    <div>
                        <Link to="/" className="text-white px-3">
                            Home
                        </Link>
                        <Link to="/login" className="text-white px-3">
                            Login
                        </Link>
                        <Link to="/register" className="text-white px-3">
                            Register
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
