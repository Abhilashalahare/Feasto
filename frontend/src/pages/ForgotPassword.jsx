import axios from 'axios';
import React, { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import {  useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners'

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] =useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleSendOtp=async()=>{
        setLoading(true)
        try {
           const result=await axios.post(`${serverUrl}/api/auth/send-otp`,
             {email},
            {withCredentials:true}) 
            console.log(result)
            setError("")
            setStep(2);
            setLoading(false)

        } catch (error) {
            setError(error?.response?.data?.message)
            setLoading(false)
        }
    }
        const handleVerifyOtp=async()=>{
             setLoading(true)
        try {
           
           const result=await axios.post(`${serverUrl}/api/auth/verify-otp`,
             {email, otp},
            {withCredentials:true}) 
            console.log(result)
             setError("")
            setStep(3);
             setLoading(false)

        } catch (error) {
            setError(error.response.data.message)
             setLoading(false)
        }
    }

     const handleResetPassword = async () => {
        setLoading(true)
  try {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const result = await axios.post(
      `${serverUrl}/api/auth/reset-password`,
      { email, newPassword },   //  matches backend
      { withCredentials: true }
    );
    setError("")
    console.log("Password reset successful:", result.data);
         setLoading(false)
    navigate("/signin");
  } catch (error) {
     setError(error?.response?.data?.message);
          setLoading(false)
  }
};


    return (
        <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#FAF7F3]'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                <div className='flex items-center gap-4 mb-4'>
                    <IoArrowBack size={30} className='text-[#c94c38] cursor-pointer' onClick={()=>navigate("/signin")}/>
                    <h1 className='text-2xl font-bold text-center text-[#c94c38]'>Forgot Password</h1>
                </div>

                {/* step=1 */}

                {step === 1 && (
                    <div>
                        {/* Email */}
                        <div className='mb-4'>
                            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                            <input
                                type="email"
                                className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none'
                                placeholder='Enter your Email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <button className={`font-semibold w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#D9A299] hover:bg-[#7c583e] text-white cursor-pointer`}
                           onClick={handleSendOtp} disabled={loading}>
                           {loading?<ClipLoader size={20} color='white'/> : "Send OTP"}
                        </button>
                        {error && <p className='text-red-600 text-center mt-3'>{error}</p>}
                    </div>
                )}

                {/* step=2 -- enter otp */}

                {step === 2 && (
                    <div>
                       
                        <div className='mb-4'>
                            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>
                                OTP</label>
                            <input
                                type="text"
                                className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none'
                                placeholder='Enter OTP'
                                onChange={(e) => setOtp(e.target.value)}
                                value={otp}
                            />
                        </div>
                        <button className={`font-semibold w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#D9A299] hover:bg-[#7c583e] text-white cursor-pointer`}
                            onClick={handleVerifyOtp} disabled={loading}>
                           {loading?<ClipLoader size={20} color='white'/> : "Verify"}
                        </button>
                         {error && <p className='text-red-600 text-center mt-3'>{error}</p>}
                    </div>
                )}

                {/* step=3 enterpassword and confirm */}

                
                {step === 3 && (
                    <div>
                       
                        <div className='mb-4'>
                            <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>
                                New Password</label>
                            <input
                                type="password"
                                className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none'
                                placeholder='Enter new password'
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                            />
                        </div>

                         <div className='mb-4'>
                            <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>
                                Confirm Password</label>
                            <input
                                type="email"
                                className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none'
                                placeholder='Enter Confirm password'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                            />
                        </div>
                        <button className={`font-semibold w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#D9A299] hover:bg-[#7c583e] text-white cursor-pointer`}
                           onClick={handleResetPassword} disabled={loading} >
                         {loading?<ClipLoader size={20} color='white'/> :" Reset Password"}
                        </button>
                         {error && <p className='text-red-600 text-center mt-3'>{error}</p>}
                    </div>
                )}




            </div>
        </div>
    )
}

export default ForgotPassword
