import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors"
import userRouter from "./routes/user.routes.js";

dotenv.config();//This loads variables from .env into process.env

const app = express();
const port = process.env.PORT || 5000 ;

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))



// use- global middleware
app.use(express.json());  //frontend se data ayega vo json me convert hona chaiye
app.use(cookieParser()); //so that tokens can easily get parsed inside cookies
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(port, ()=>{
    connectDB()
    console.log(`server started at ${port}`);        
})
