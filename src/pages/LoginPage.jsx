import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import NavBar from "../components/NavBar";
import { AuthContext } from "../auth/AuthContext";
import axios from "../axios";
import InputText from "../components/FormComponents/InputText";
import { Button } from "flowbite-react";
import ButtonMedium from "../components/FormComponents/ButtonMedium";

const LoginPage = () => {
    const { loggedIn } = useAuth(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;

        try {
            const response = await axios.post("/api/login", {
                email,
                password,
            });
            const { name } = response.data; // Assuming the response contains the user category
            console.log(response.data);

            // Construct userData
            const userData = {
                isAuthenticated: true,
                name: name,
            };

            setError("");
            // Use login function from context
            loggedIn(userData);
        } catch (error) {
            console.error("Login failed:", error);
            setError("Invalid email or password. Please try again.");
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <NavBar />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>

                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <InputText
                                    value={email}
                                    onChange={setEmail}
                                    type={"email"}
                                    placeholder={"name@company.com"}
                                    labelName={"Email"}
                                />
                            </div>
                            <div>
                                <InputText
                                    value={password}
                                    onChange={setPassword}
                                    type={"password"}
                                    placeholder={"••••••••"}
                                    labelName={"Password"}
                                />
                            </div>
                            <ButtonMedium type={"submit"} text={"Sign in"} />

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <Link
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    to="/register"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
