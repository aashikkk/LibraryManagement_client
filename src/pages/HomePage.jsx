import React from "react";
import NavBar from "../components/NavBar";
import FooterBar from "../components/FooterBar";

const HomePage = () => {
    return (
        <div className="flex flex-col h-screen bg- ">
            <NavBar />
            <div className="flex-grow flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Welcome to the Online Library
                    </h1>
                    <p className="text-lg pb-5">
                        Explore and borrow your favorite books
                    </p>
                    <div className="flex justify-center ">
                        <img
                            className="object-fill w-8/12 rounded-md"
                            src="https://img.freepik.com/free-photo/clean-empty-library-hall_23-2149215414.jpg?w=1380&t=st=1725134989~exp=1725135589~hmac=c06569d2aebee8ab523a24069a5db519115c757a346c4a47dcfe2db7de354ad5"
                            alt="library"
                        />
                    </div>
                </div>
            </div>
            <FooterBar />
        </div>
    );
};

export default HomePage;
