import mongoose from "mongoose"

const connectDb=async () => {
    try {
        
        const mongoUrl = process.env.MONGODB_URL
        await mongoose.connect(mongoUrl)
        console.log("db connected")
    } catch (error) {
        console.log("db error", error.message)
    }
}

export default connectDb