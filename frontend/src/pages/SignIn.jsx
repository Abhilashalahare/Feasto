import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from 'react-spinners'
import { setLogLevel } from "firebase/app";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userSlice";

const SignIn = () => {
  const primaryColor = "#F0E4D3";
  const bgColor = "#FAF7F3";
  const borderColor = "#D9A299";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false)
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setloading(true)
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`, // ✅ corrected URL
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data))
      // console.log("SignIn success:", result.data);
      setError("");
      setloading(false)
      // navigate to dashboard or home after successful login
      // navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Sign in failed");
      console.log("SignIn error:", err.response?.data || err.message);
      setloading(false)
    }
  };

  const handleGoogleAuth = async()=>{
   
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
  
    try {
      const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`,
     { 
      email: result.user.email,   
     }, 
     {withCredentials: true})
     dispatch(setUserData(data))
    //  console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border"
        style={{ borderColor: primaryColor }}
      >
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: borderColor }}
        >
          Feasto
        </h1>
        <p className="text-gray-600 mb-8">
          Sign in to your account to get started with delicious deliveries
        </p>

        
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your Email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email} required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter your Password"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setPassword(e.target.value)}
              value={password} required
            />
            <button
              type="button"
              className="absolute right-3 top-[14px] text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        <div className="text-right mb-4 text-[#c94c38] font-medium cursor-pointer" onClick={()=>navigate("/forgot-password")}>
          Forgot Password?
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            className="font-semibold w-full flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#D9A299] hover:bg-[#7c583e] text-white cursor-pointer"
            onClick={handleSignIn} disabled={loading}
          >
             {loading? <ClipLoader size={20} color='white'/>:"Sign In"}

          </button>

         {error && <p className='text-red-600 text-center mt-3'>{error}</p>}

          <button onClick={handleGoogleAuth} className="w-full flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100">
            <FcGoogle size={20} />
            <span>Sign In with Google</span>
          </button>
        </div>

        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Want to create a new account?{" "}
          <span className="text-[#c94c38]">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
