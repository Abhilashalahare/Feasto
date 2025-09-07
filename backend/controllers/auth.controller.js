
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js";

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

        const token = await genToken(newUser._id)
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