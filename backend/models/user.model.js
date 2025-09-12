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

    },
     // generate otp and store in backend
    resetOtp:{
        type: String,

    },
    isOtpVaerified:{
        type:Boolean,
        default: false,
   

    },
    // otp will expire after 5mins

    otpExpires: {
      type: Date
    },


}, {timestamps: true})


const User = mongoose.model("User", userSchema) 
export default User;