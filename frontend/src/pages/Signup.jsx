import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setUserData } from '../Redux/userSlice';


const Signup = () => {
  const primaryColor = "#F0E4D3"
  const hoverColor = "#DCC5B2"
  const bgColor = "#FAF7F3"
  const borderColor = "#D9A299"


  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user")
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] =useState("");
  const [loading, setloading] = useState(false)

  const dispatch = useDispatch() //hook from redux
  const navigate = useNavigate()

 const handleSignup = async () => {
  setloading(true)
  try {
    const result = await axios.post(
      `${serverUrl}/api/auth/signup`,
      {
        fullname: fullName,   // match backend key
        email,
        password,
        mobile,
        role
      },
      { withCredentials: true }
    );
    dispatch(setUserData(result.data))
    // console.log(result.data);
    setError("")
    setloading(false)
  } catch (error) {
    setError(error?.response?.data?.message)
    setloading(false)
  }
};

const handleGoogleAuth = async()=>{
  //mobile number is required
  if(!mobile){
   return setError("Mobile number is required")
  }
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  console.log(result.user.displayName)

  try {
    const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`,
   {
    fullname: result.user.displayName,
    email: result.user.email,
    role,
    mobile
    
   }, {withCredentials: true})
   dispatch(setUserData(result.data))
   console.log(data)
  } catch (error) {
    console.log(error)
  }
}


  return (
    
     <div 
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}>
      <div  className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border"
        style={{ borderColor: primaryColor }}>
          <h1 className='text-3xl font-bold mb-2' style={{color: borderColor}}>Feasto</h1>
          <p className='text-gray-600 mb-8'>Create your account to get started with delicious deliveries</p>

          {/* fullname */}
          <div className='mb-4'>
            <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Full Name</label>
            <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter your Full Name' style={{ border: `1px solid ${borderColor}`}}
            onChange={(e)=> setFullName(e.target.value)}
            value={fullName} required/>
          </div>

           {/* Email */}
          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
            <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter your Email' style={{ border: `1px solid ${borderColor}`}}
             onChange={(e)=> setEmail(e.target.value)}
            value={email} required/>
          </div>

           {/* mobile */}
          <div className='mb-4'>
            <label htmlFor="mobile" className='block text-gray-700 font-medium mb-1'>Mobile</label>
            <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter your Mobile Number' style={{ border: `1px solid ${borderColor}`}}
             onChange={(e)=> setMobile(e.target.value)}
            value={mobile} required/>
          </div>

              {/* password */}
          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
           <div className='relative'>
             <input type={`${showPassword ? "text": "password" }`} className='w-full border rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter your Password' style={{ border: `1px solid ${borderColor}`}}
             onChange={(e)=> setPassword(e.target.value)}
            value={password} required/>
           
           <button className='absolute right-3 top-[14px] text-gray-500 cursor-pointer' onClick={()=>setShowPassword(prev => !prev)} >{showPassword ? <FaRegEye />: <FaRegEyeSlash /> }</button>
           </div>
          </div>


           {/* role */}
          <div className='mb-4'>
            <label htmlFor="role" className='block text-gray-700 font-medium mb-1'>Role</label>
           <div className='flex gap-2 '>
            {["user", "owner", "deliveryBoy"].map((r)=>(
              <button className='cursor-pointer flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors '
              onClick={()=> setRole(r)}
               style={role == r? 
               {backgroundColor: borderColor, color: "white"}:
               {border: `1px solid ${borderColor}`, color:"#333"}
              }>
                {r}</button>
            ))}
          </div>

      </div>
       <button className={`font-semibold w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#D9A299] hover:bg-[#7c583e] text-white cursor-pointer`} 
        onClick={handleSignup} disabled={loading}>
          {loading? <ClipLoader size={20} color='white' />:"Sign Up"}
    
    </button>
    {error && <p className='text-red-600 text-center mt-3'>{error}</p>}
    <button onClick={handleGoogleAuth} className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100'>
      <FcGoogle  size={20} />
      <span>Sign Up with Google</span>

    </button>
    <p className='text-center mt-6 cursor-pointer' onClick={()=>navigate("/signin")}>Already have an account? <span className='text-[#c94c38]'>Sign In</span></p>
       
    </div>


    </div>
  )
}

export default Signup
