import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true

    }, 
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password:{
        type: String,
    },
    mobile:{
        type: String,
        required: true

    },

    role:{
        type: String,
        enum: ["user", "owner", "deliveryBoy"], //iske alawa or kuch nhi hona chiaye
        required: true

    }

}, {timestamps: true})


const User = mongoose.model("User", userSchema) 
export default User;