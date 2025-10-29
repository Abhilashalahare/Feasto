
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";


export const signup = async(req, res)=>{
    try {
        const {fullname, email, password, mobile, role} = req.body;
        let existingUser = await User.findOne({email});
         // 1. Check if user already exists
        if(existingUser){
            return res.status(400).json({message: "User Already exists"})
        }

        if(password.length<6){
            return res.status(400).json({message: "Password must be atleast 6 characters"})
        }

        if(mobile.length<10){
             return res.status(400).json({message: "Mobile Number must be atleast 10 digits"})
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        let newUser = await User.create({
            fullname,
            email,
            role,
            mobile,
            password: hashedPassword
        })

       

        //token is generated and added inside cookie-- utils/token.js
     
      const token = genToken(newUser._id);
      console.log("Generated JWT:", token);
        // is token ko cookies k andr parse krna h
        res.cookie("token", token, {
             secure:false, //http - localhost me secure nhi h isly false rkhre h, bad me deploy k time true krenge
             sameSite: "strict",
             maxAge: 7*24*60*60*1000,
             httpOnly: true
        })

        // return res.status(201).json(user);
         return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
        mobile: newUser.mobile,
      },
    });


    } catch (error) {
        return res.status(500).json(`signup up error ${error}`);
    }
}


export const signIn = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
         // 1. Check if user does not exists
        if(!user){
            return res.status(400).json({message: "User Doesn't exists"})
        }

        // matching password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Incorrect Password"})
        }
     
        //token is generated and added inside cookie-- utils/token.js

        const token = await genToken(user._id)
        // is token ko cookies k andr parse krna h
        res.cookie("token", token, {
             secure:false, //http - localhost me secure nhi h isly false rkhre h, bad me deploy k time true krenge
             sameSite: "strict",
             maxAge: 7*24*60*60*1000,
             httpOnly: true
        })

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json(`signIn error ${error}`);
    }
}

// browser ki cookies k andr jo token pas kiye h usko hta denge to logout ho jayenge
export const signOut = async(req, res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "log out successfully"})
    } catch (error) {
        return res.status(500).json({message: `sign out error ${error}` })
    }
}

// generate otp and send to email

export const sendOtp = async(req, res)=>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return  res.status(400).json({message: "User Doesn't exists"})
        }

        // generate otp
        const otp = Math.floor(1000 + Math.random() * 9000).toString();  //6 digit otp
        user.resetOtp=otp;
        user.otpExpires=Date.now()+5*60*1000 
        user.isOtpVaerified=false;
        await user.save()
        await sendOtpMail(email, otp)
        return res.status(200).json({message: "otp sent successfully"})
    } catch (error) {
        return res.status(500).json(`send otp error ${error}`)
    }
}

export const verifyOtp = async(req, res)=>{
    try {
        const {email, otp} = req.body
        const user= await User.findOne({email})
        if(!user || user.resetOtp != otp || user.otpExpires<Date.now()){
            return res.status(400).json({message:"invalid/expired otp"})
        }
        user.isOtpVaerified=true
        user.resetOtp=undefined
        user.otpExpires =undefined
        await user.save()
        return res.status(200).json({message: "otp verify successfully"})
    } catch (error) {
        return res.status(500).json(`verify otp error ${error}`)
    }
}

export const resetPassword=async(req, res)=>{
    try {
        const {email, newPassword} = req.body;
        const user=await User.findOne({email})
        if(!user || !user.isOtpVaerified){
            return res.status(400).json({message: "otp verification required"})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password=hashedPassword
        user.isOtpVaerified=false
        await user.save()
        return res.status(200).json({message: "password reset successfully"})
    
    } catch (error) {
        return res.status(500).json(`reset password error ${error}`)
    }
}

export const googleAuth=async(req, res)=>{
    try {
        const {fullname, email, mobile, role} = req.body
        // fund user using email
        let user=await User.findOne({email})
        if(!user){//if not found, create user
            user=await User.create({
                fullname, email, mobile, role
            })
        }

        // generte token
           const token = await genToken(user._id)
        // is token ko cookies k andr parse krna h
        res.cookie("token", token, {
             secure:false, //http - localhost me secure nhi h isly false rkhre h, bad me deploy k time true krenge
             sameSite: "strict",
             maxAge: 7*24*60*60*1000,
             httpOnly: true
        })

        return res.status(200).json(user);

    } catch (error) {
          return res.status(500).json(`Google auth error ${error}`)
    }
}