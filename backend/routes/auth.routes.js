import express from "express";
import { signIn, signOut, signup } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/signin", signIn)
authRouter.post("/signout", signOut)

export default authRouter;