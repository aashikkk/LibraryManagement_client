import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import axios from "../axios";
import NavItem from "../components/NavBarItem";

function NavBar() {
    const { user, loggedIn, loggedOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleTokenExpiry = () => {
            loggedOut();
            navigate("/login");
        };

        document.addEventListener("token-expired", handleTokenExpiry);

        return () => {
            document.removeEventListener("token-expired", handleTokenExpiry);
        };
    }, [loggedOut, navigate]);

    const handleLoggedOut = async () => {
        try {
            const response = await axios.post("/api/logout");
            if (response.status === 200) {
                loggedOut();
                navigate("/login");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
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
                        {user && user.isAuthenticated ? (
                            <>
                                <NavItem link={"/book"} text={"Dashboard"} />
                                <NavItem
                                    onClick={handleLoggedOut}
                                    text={"Log Out"}
                                />
                            </>
                        ) : (
                            <NavItem
                                onClick={loggedIn}
                                className={"text-white px-3"}
                                link={"/login"}
                                text={"Login"}
                            />
                        )}
                        <NavItem
                            onClick={loggedIn}
                            className={"text-white px-3"}
                            link={"/register"}
                            text={"Register"}
                        />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
