import React from "react";
import NavBar from "../components/NavBar";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <NavBar />
            <RegisterForm />
        </section>
    );
};

export default RegisterPage;
