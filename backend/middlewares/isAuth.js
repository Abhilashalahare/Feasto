import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
const isAuth=async (req,res,next) => {
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(400).json({message:"token not found"})
        }
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET)
        if(!decodeToken){
 return res.status(400).json({message:"token not verify"})
        }
        req.userId=decodeToken.userId
        next()
    } catch (error) {
         return res.status(500).json({message:"isAuth error"})
    }
}

export const verifyToken = isAuth

export const verifyAdmin = async (req, res, next) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        if (user.role !== 'owner') { // Assuming owner is admin
            return res.status(403).json({ message: "Access denied. Admin only." })
        }
        next()
    } catch (error) {
        return res.status(500).json({ message: "Verify admin error" })
    }
}

export default isAuth