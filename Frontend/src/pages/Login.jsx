import React, { useState } from "react";
import {login} from '../axios/api/auth.api.js'
function Login() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    const handleSignUpClick = () => setIsRightPanelActive(true);
    const handleSignInClick = () => setIsRightPanelActive(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        console.log("Login Response:", e);
        e.preventDefault();
        const response = await login(email, password, "User");
        console.log("Login Response:", response);
    };

    return (
        <div
            className={`relative mx-auto my-10 max-w-[900px] min-h-[600px] rounded-lg shadow-2xl overflow-hidden bg-[#1E3A8A] transition-all duration-500 ${isRightPanelActive ? "right-panel-active" : ""
                }`}
        >
            {/* Sign Up Section */}
            <div
                className={`absolute top-0 left-0 h-full w-1/2 p-6 sm:p-16 flex flex-col items-center justify-center transition-transform duration-500 ${isRightPanelActive
                        ? "translate-x-full opacity-100 z-10"
                        : "opacity-0 z-0"
                    }`}
            >
                <form className="text-center text-white">
                    <h1 className="font-extrabold text-2xl mb-6">Create Account</h1>
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full bg-white text-gray-700 hover:bg-gray-100">
                            G {/* Placeholder for Google Login */}
                        </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">or use your email for registration</p>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-4 text-gray-800 mb-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-4 mb-4 text-gray-800 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-4 mb-4 text-gray-800 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full p-4 mb-4 text-gray-800 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                        type="submit"
                        className="px-10 py-3 mt-4 text-gray-800 rounded-full bg-purple-600 text-white uppercase font-bold hover:bg-purple-700"
                    >
                        Sign Up
                    </button>
                </form>
            </div>

            {/* Sign In Section */}
            <div
                className={`absolute top-0 left-0 h-full w-1/2 p-6 sm:p-16 flex flex-col items-center justify-center transition-transform duration-500 ${isRightPanelActive
                        ? "-translate-x-full opacity-0 z-0"
                        : "opacity-100 z-10"
                    }`}
            >
                
                    <h1 className="font-extrabold text-2xl mb-6">Sign In</h1>
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full bg-white text-gray-700 hover:bg-gray-100">
                            G {/* Placeholder for Google Login */}
                        </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">or use your email to log in</p>
                    <form className="text-center text-white" onSubmit={handleLogin}>
                        <h1 className="font-extrabold text-2xl mb-6">Sign In</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-4 mb-4 text-gray-800 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-4 mb-4 text-gray-800 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="px-10 py-3 mt-4 rounded-full bg-purple-600 text-white uppercase font-bold hover:bg-purple-700"
                        >
                            Sign In
                        </button>
                    </form>
               
            </div>

            {/* Overlay Section */}
            <div
                className={`absolute top-0 left-1/2 h-full w-1/2 overflow-hidden transition-transform duration-500 z-20 ${isRightPanelActive ? "-translate-x-full" : "translate-x-0"
                    }`}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 flex">
                    <div
                        className={`absolute top-0 left-0 h-full flex flex-col items-center justify-center p-10 transition-transform duration-500 ${isRightPanelActive ? "translate-x-0" : "-translate-x-full"
                            }`}
                    >
                        <h1 className="font-extrabold text-3xl text-white mb-6">Hello, Friend!</h1>
                        <p className="text-base text-gray-200 mb-6">
                            Enter your personal details and start your journey with us.
                        </p>
                        <button
                            className="px-10 py-3 rounded-full border border-white text-white uppercase font-bold hover:bg-white hover:text-purple-700"
                            onClick={handleSignInClick}
                        >
                            Sign In
                        </button>
                    </div>
                    <div
                        className={`absolute top-0 right-0 h-full flex flex-col items-center justify-center p-10 transition-transform duration-500 ${isRightPanelActive ? "translate-x-full" : "translate-x-0"
                            }`}
                    >
                        <h1 className="font-extrabold text-3xl text-white mb-6">Welcome Back!</h1>
                        <p className="text-base text-gray-200 mb-6">
                            To keep connected with us, please login with your personal info.
                        </p>
                        <button
                            className="px-10 py-3 rounded-full border border-white text-white uppercase font-bold hover:bg-white hover:text-purple-700"
                            onClick={handleSignUpClick}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Login;
