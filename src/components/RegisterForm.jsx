import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputText from "./FormComponents/InputText";
import ButtonMedium from "./FormComponents/ButtonMedium";
import { Input, Ripple, initTWE } from "tw-elements";

const RegisterForm = () => {
    useEffect(() => {
        initTWE({ Input, Ripple });
    }, []);

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) {
            errors.name = "Name is required";
        }
        if (!email || !emailRegex.test(email)) {
            errors.email = "Invalid email address";
        }
        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }
        if (password != confirmPassword) {
            errors.password = "Password do not match";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post("/api/register", {
                name,
                email,
                password,
            });

            console.log(response.data);
            navigate("/register/success");
        } catch (error) {
            console.error(error.response.data);
            // Handle error
        }
    };
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Register your account
                    </h1>
                    <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <InputText
                                value={email}
                                onChange={setEmail}
                                type={"text"}
                                placeholder={"email"}
                                error={errors.email}
                                labelName={"Your email"}
                            />
                        </div>
                        <div>
                            <InputText
                                value={name}
                                onChange={setName}
                                type={"text"}
                                placeholder={"name"}
                                error={errors.name}
                                labelName={"Name"}
                            />
                        </div>
                        <div>
                            <InputText
                                value={password}
                                onChange={setPassword}
                                type={"password"}
                                placeholder={"•••••"}
                                error={errors.password}
                                labelName={"Password"}
                            />
                        </div>
                        <div>
                            <InputText
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                type={"password"}
                                placeholder={"•••••"}
                                error={errors.confirmPassword}
                                labelName={"Confirm Password"}
                            />
                        </div>
                        <ButtonMedium type={"submit"} text={"Register"} />
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
