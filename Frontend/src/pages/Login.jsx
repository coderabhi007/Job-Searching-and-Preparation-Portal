import React, { useState } from "react";
import { login } from '../axios/api/auth.api.js'
import { sendOtp } from "../axios/api/otp.api.js";
import { verifyOtp } from "../axios/api/otp.api.js";
import { register } from "../axios/api/auth.api.js";
import { toast } from "react-toastify";
import { isRegisterd } from "../axios/api/auth.api.js";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const handleLogin = async (e) => {

    e.preventDefault();
    const response = await login(email, password, "User");
    console.log("Login Response:", response);
    if (response.success) {
      toast.success("User Login successfully!"); // Success message
    }
    else {
      toast.error("Invalid Email or Password");
    }
  };
  const startTimer = () => {
    setIsTimerActive(true);
    let timeLeft = 120;
    const interval = setInterval(() => {
      timeLeft--;
      setTimer(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval);
        setIsTimerActive(false);
      }
    }, 1000);
  };
  const handleSignUp=async()=>{
    const res = await isRegisterd(email);
    if (res?.success) {
      handleSendOtp();
     
    } else {
      toast.error(res?.message || "Failed to send OTP"); // Error message
    }
  }

  const handleSendOtp = async () => {
    const res = await sendOtp(email);
    if (res?.success) {
      setOtpSent(true);
      startTimer();
      toast.success("OTP sent successfully!"); // Success message
    } else {
      toast.error(res?.message || "Failed to send OTP"); // Error message
    }
  };

  const handleVerifyOtp = async () => {
    const res = await verifyOtp(email, otp);
    if (res?.success) {
      setOtpVerified(true);
      toast.success("OTP Verified successfully !"); // Success message
    } else {
      toast.error(res?.message || "Invalid OTP");

    }
  };

  const handleRegisterByGoogle = async () => {
    const res = await RegisterByEmail(email);
    if (res?.success) {
      setOtpVerified(true);
      toast.success("OTP Verified successfully !"); // Success message
    } else {
      toast.error(res?.message || "Invalid OTP");

    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error(res?.message || "Passwords do not match");
      return;
    }
    const res = await register(email, password, "User", confirmPassword);
    toast.success("Registration Successful!"); // Success message
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
        <form className="text-center">
          <h1 className="font-extrabold text-2xl mb-6">Create Account</h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 mb-4 text-gray-800 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={otpSent}
          />

          {!otpSent && !otpVerified && (
            <button
              type="button"
              onClick={handleSignUp}
              className="w-full px-6 py-3 cursor-pointer mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Get OTP
            </button>
          )}

          {otpSent && !otpVerified && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-4 mb-4 text-gray-800 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full px-6 py-3 cursor-pointer mb-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                disabled={!isTimerActive}
              >
                Verify OTP ({timer}s)
              </button>
            </>
          )}


          {otpVerified && (
            <>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 mb-4 text-gray-800 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-4 mb-4 text-gray-800 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={handleRegister}
                className="w-full px-10 py-3 mt-4 cursor-pointer bg-purple-800 text-white uppercase font-bold rounded-lg hover:bg-purple-900"
              >
                Sign Up
              </button>
            </>
          )}
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
            className="px-10 py-3 mt-4 cursor-pointer rounded-full bg-purple-600 text-white uppercase font-bold hover:bg-purple-700"
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
              className="px-10 py-3 rounded-full pointer-cursor border border-white text-white uppercase font-bold hover:bg-white hover:text-purple-700"
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
              className="px-10 py-3 rounded-full border cursor-pointer border-white text-white uppercase font-bold hover:bg-white hover:text-purple-700"
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
