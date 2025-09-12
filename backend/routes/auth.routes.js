import express from "express";
import { resetPassword, sendOtp, signIn, signOut, signup, verifyOtp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/signin", signIn)
authRouter.post("/signout", signOut)
authRouter.post("/send-otp", sendOtp)
authRouter.post("/verify-otp", verifyOtp)
authRouter.post("/reset-password", resetPassword)

export default authRouter;